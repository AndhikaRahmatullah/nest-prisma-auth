import { Controller, Post, Body } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/validasi.pipe';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body(new ValidationPipe()) dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body(new ValidationPipe()) dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
