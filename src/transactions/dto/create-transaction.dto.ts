import { IsUUID, IsNumber, IsPositive, IsDate } from 'class-validator';
export class CreateTransactionDto {
  @IsUUID()
  userID: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsDate()
  timestamp: Date;

  @IsNumber()
  transactionID: number;
}
