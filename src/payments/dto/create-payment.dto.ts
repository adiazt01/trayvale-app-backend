import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

export class CreatePaymentDto {
  @IsString()
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  amount: number;

  @IsString()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsOptional()
  @IsString()
  transactionId: string | null;

  @IsString()
  saleId: string | null;
}
