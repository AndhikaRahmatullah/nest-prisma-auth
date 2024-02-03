import { IsEmail, IsString } from 'class-validator';
import { PayloadLoginAuthInterface } from '../interfaces/auth.interface';

export class AuthDto implements PayloadLoginAuthInterface {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
