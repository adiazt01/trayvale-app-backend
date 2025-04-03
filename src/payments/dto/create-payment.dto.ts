import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { PaymentMethod } from "../enums/payment-method.enum";
import { PaymentStatus } from "../enums/payment-status.enum";

export class CreatePaymentDto {
    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;

    @IsNumber({
        maxDecimalPlaces: 2,
    })
    amount: number;

    @IsEnum(PaymentStatus)
    status: PaymentStatus;
    
    @IsOptional()
    @IsString()
    transactionId: string | null;

    @IsOptional()
    @IsString()
    saleId: string | null;
}
