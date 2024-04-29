import { IsAlpha, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsAlpha()
  username: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
