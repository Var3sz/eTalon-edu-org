import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, ValidateNested } from 'class-validator';

export type Payment = {
  datum: string;
  jogcim: string;
  osszeg: number;
  leiras?: string;
};

class PaymentDto {
  @IsString() datum!: string; // 'YYYY-MM-DD'
  @IsString() jogcim!: string;
  @IsNumber() @Type(() => Number) osszeg!: number;
  @IsOptional() @IsString() leiras?: string;
}

export class RegisterCreditEntryDto {
  @IsString() agentKey!: string;
  @IsString() invoiceNumber!: string;
  @IsOptional() @IsString() issuerTaxNumber?: string;
  @IsOptional() @IsBoolean() @Type(() => Boolean) additiv?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentDto)
  payments!: PaymentDto[];
}
