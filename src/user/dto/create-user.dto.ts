import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { PayloadRegisterAuthInterface } from 'src/auth/interfaces/auth.interface';

export class CreateUserDto implements PayloadRegisterAuthInterface {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
