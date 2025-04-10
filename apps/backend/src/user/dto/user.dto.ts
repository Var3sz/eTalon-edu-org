import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class ProfileDto {
  id: number;
  email: string;
  name: string;
  roleId: number;
}
