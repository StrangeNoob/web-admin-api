import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddTransactionDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}
