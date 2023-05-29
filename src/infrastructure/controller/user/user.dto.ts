import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../../../domain/model/role';

export class AddUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
}

export class ChangeUserRoleDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEnum(UserRole)
  readonly role: UserRole;
}
