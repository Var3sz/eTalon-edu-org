import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  password: string;
}
