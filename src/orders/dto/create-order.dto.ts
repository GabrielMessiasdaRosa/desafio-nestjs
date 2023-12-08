import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly asset_id: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;
}
