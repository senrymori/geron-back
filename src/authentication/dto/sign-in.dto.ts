import { IsAlpha, IsNotEmpty } from 'class-validator';

export class SignInDTO {
  @IsAlpha()
  username: string;

  @IsNotEmpty()
  password: string;
}
