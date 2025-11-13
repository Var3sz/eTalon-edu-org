import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState, useTransition } from 'react';

import { PaymentsDto, StudentPaymentDto, UpdatePaymentsDto } from '@/models/Api';

import useGetPaymentsDataByCourseId from './use-get-payments-data-by-id-query';
import { useForm } from 'react-hook-form';
import { PaymentDateColumnType } from '@/models/students/types';
import { formatDateCustom } from '@/lib/utils';
import { DatePatterns } from '@/api/consts/date-patterns';
import { PaymentFormDefault } from '@/validation/default-values/payment/payment-form-default';
import { PaymentFormData } from '@/validation/default-values/payment/payment-form-data';
import { toast } from '@/components/ui/use-toast';
import { UpdatePaymentsRequest } from '@/models/payments/update-payments-action';

type UseInitPaymentClientModel = {
  courseId: string;
  token: string;
  userId: number;
};

export type PaymentCell = {
  payed: boolean;
  amount: number;
  invoiceNumber: string;
};

export type StudentPayment = {
  studentId: number;
  studentName: string;
  [date: string]: PaymentCell | string | number;
};

export type PaymentForm = {
  studentId: number;
  [date: string]: PaymentCell | number;
};

export type StudentPaymentForm = {
  payments: PaymentForm[];
  Helpers: {
    inEdit: boolean;
  };
};

export default function useInitPaymentClient({ courseId, token, userId }: UseInitPaymentClientModel) {
  const [isPending, startTransaction] = useTransition();
  const queryClient = useQueryClient();

  // Fizetési adatok lekérdezése
  const { data: paymentsDataResponse } = useGetPaymentsDataByCourseId(courseId, token);
  const payment: PaymentsDto | null =
    paymentsDataResponse?.status === 200 && paymentsDataResponse.data ? paymentsDataResponse.data : null;

  // Állapotok
  const [courseName, setCourseName] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<StudentPayment[]>([]);
  const [paymentOnly, setPaymentOnly] = useState<PaymentForm[]>();

  // Form a befizetések kezelésére
  const form = useForm<StudentPaymentForm>({
    defaultValues: PaymentFormDefault(),
  });

  const dateCols: PaymentDateColumnType[] = useMemo(() => {
    if (!payment) return [];

    const allDates = payment.payments.flatMap((student) =>
      student.Payments.map((p) => ({
        invoiceDateId: p.invoiceDateId,
        date: formatDateCustom(p.date, DatePatterns.DATEURI)!,
        description: p.description ?? '',
      }))
    );

    const uniqueDateMap = new Map<string, PaymentDateColumnType>();
    for (const entry of allDates) {
      if (!uniqueDateMap.has(entry.date)) {
        uniqueDateMap.set(entry.date, entry);
      }
    }

    return Array.from(uniqueDateMap.values());
  }, [payment]);

  useEffect(() => {
    if (payment !== null) {
      setCourseName(payment.courseId);

      // Extract and normalize invoice dates
      const allDates = payment.payments.flatMap((payment) =>
        payment.Payments.map((a) => ({
          invoiceDateId: a.invoiceDateId,
          date: formatDateCustom(a.date, DatePatterns.DATEURI)!,
          description: a.description ?? '',
        }))
      );

      // Remove duplicates by date
      const uniqueDateMap = new Map<string, { invoiceDateId: number; date: string; description: string }>();
      for (const entry of allDates) {
        if (!uniqueDateMap.has(entry.date)) {
          uniqueDateMap.set(entry.date, entry);
        }
      }

      // Add synthetic id
      const dateColumns = Array.from(uniqueDateMap.values()).map((entry) => ({
        invoiceDateId: entry.invoiceDateId,
        date: entry.date,
        description: entry.description,
      }));

      const data: StudentPayment[] = payment.payments.map((student) => {
        const { Payments, ...details } = student;

        const row: StudentPayment = {
          ...details,
        };

        dateColumns.forEach(({ invoiceDateId }) => {
          const att = student.Payments.find((a) => a.invoiceDateId === invoiceDateId);
          row[invoiceDateId] = {
            payed: Boolean(att?.payed),
            amount: att?.amount ?? 0,
            invoiceNumber: att?.invoiceNumber ?? '',
          };
        });

        return row;
      });

      setPaymentData(data);
    }
  }, [payment]);

  useEffect(() => {
    setPaymentOnly(
      paymentData.map((payment) => {
        const { studentId, ...rest } = payment;

        const payments: PaymentForm = {
          studentId,
        };

        for (const key in rest) {
          const maybeId = Number(key);
          if (Number.isInteger(maybeId)) {
            payments[maybeId] = rest[key] as PaymentCell;
          }
        }

        return payments;
      })
    );
  }, [paymentData]);

  useEffect(() => {
    if (paymentOnly && paymentOnly.length > 0) {
      form.reset(PaymentFormData(paymentOnly));
    }
  }, [paymentOnly]);

  useEffect(() => {
    if (!form.getValues().Helpers.inEdit && paymentOnly && paymentOnly.length > 0) {
      form.reset(PaymentFormData(paymentOnly));
    }
  }, [form.getValues().Helpers.inEdit]);

  // Form submit - backend-re megyünk frissíteni a fizetési adatokat
  const onValidFormSubmit = (data: StudentPaymentForm) => {
    startTransaction(async () => {
      const payload: UpdatePaymentsDto[] = data.payments.flatMap(({ studentId, ...rest }) => {
        return Object.entries(rest).map(([invoiceDateId, cell]) => {
          const { payed, amount, invoiceNumber } = cell as PaymentCell;
          return {
            studentId: studentId,
            invoiceDateId: Number(invoiceDateId),
            billerId: userId,
            payed: payed,
            payedAmount: amount,
            invoiceNumber: invoiceNumber,
          };
        });
      });

      const updateResponse = await UpdatePaymentsRequest(payload, token);

      if (updateResponse.status === 200) {
        await queryClient.invalidateQueries({ queryKey: ['payments-data', courseId] });
        toast({
          variant: 'success',
          title: 'Sikeres frissítés!',
          description: 'A fizetési adatok frissítése sikeres!',
        });
        form.setValue('Helpers.inEdit', false);
      } else {
        toast({
          title: 'Sikertelen frissítés!',
          description: updateResponse.status === 500 && updateResponse.error.Message,
          variant: 'destructive',
        });
      }
    });
  };

  const onInvalidFormSubmit = (e: any) => {
    console.error(e);
    toast({
      title: 'Hibás adatok!',
      description: 'Hiba történt a validáció során!',
      variant: 'destructive',
    });
  };

  return useMemo(
    () => ({ form, isPending, courseName, paymentData, dateCols, onValidFormSubmit, onInvalidFormSubmit }),
    [form, isPending, courseName, paymentData, dateCols, onValidFormSubmit, onInvalidFormSubmit]
  );
}
