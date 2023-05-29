import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateGroupDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;
}

export class CreateGroupDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly admin_id: number;
}

export class ChangeAdminGroupDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly admin_id: number;
}
