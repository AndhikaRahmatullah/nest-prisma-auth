import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RegisterAuthInterface } from './interfaces/auth.interface';
import * as bcrypt from 'bcrypt';

// --------------------------------------------------------------------------------

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // --------------------------------------------------------------------------------

  async login(dto: AuthDto) {
    const user = await this.findEmail(dto.email);

    if (user) {
      const passwordCompare = await bcrypt.compare(dto.password, user.password);

      if (passwordCompare) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        const payload = { sub: user.id, username: user.email };

        return {
          message: 'User successfully logged in.',
          data: {
            ...result,
            accessToken: await this.jwtService.signAsync(payload, {
              secret: 'kjadwjkd09q2bj29e2uncapqnq',
              expiresIn: '60s',
            }),
          },
        };
      }
    }

    throw new UnauthorizedException();
  }

  // --------------------------------------------------------------------------------

  async register(dto: CreateUserDto): Promise<RegisterAuthInterface> {
    const checkEmail = await this.findEmail(dto.email);
    const salt = await bcrypt.genSalt();

    if (checkEmail) {
      throw new ConflictException('Email has been registered.');
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await bcrypt.hash(dto.password, salt),
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = newUser;
    return { message: 'User account successfully created.', data: user };
  }

  // --------------------------------------------------------------------------------

  async findEmail(email: string) {
    const data = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return data;
  }
}
