export type Payment = {
  invoiceDateId: number;
  date: string; // ISO string
  description: string;
  billerId: number | null;
  payed: boolean;
  amount: number;
  invoiceNumber: string | null;
  amountToBePayed: number;
};

export type StudentPayment = {
  studentId: number;
  studentName: string;
  Payments: Payment[];
};

export type StudentPaymentResponse = {
  courseId: string;
  payments: StudentPayment[];
};
