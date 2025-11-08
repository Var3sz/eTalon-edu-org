import { IsBoolean, IsInt, IsString } from 'class-validator';

export class UpdatePaymentsDto {
  @IsInt()
  studentId: number;

  @IsInt()
  invoiceDateId: number;

  @IsInt()
  billerId: number;

  @IsBoolean()
  payed: boolean;

  @IsInt()
  payedAmount: number;

  @IsString()
  invoiceNumber: string;
}

export type BulkPaymentResult = {
  index: number;
  input: UpdatePaymentsDto;
  ok: boolean;
  status?: number;
  message?: string;
  pdfSaved?: boolean;
  skipped?: true;
  skipReason?: 'ZERO_AMOUNT' | 'UNCHANGED_AMOUNT';
};
