import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  symbol: string;
}
