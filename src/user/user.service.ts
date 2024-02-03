import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  UserInterface,
  UserDetailInterface,
} from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // --------------------------------------------------------------------------------

  async findAll(): Promise<UserInterface> {
    const users = await this.prisma.user.findMany();
    const withoutPassword = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...others } = user;

      return others;
    });

    return { message: 'Users successfully found.', data: withoutPassword };
  }

  // --------------------------------------------------------------------------------

  async findId(id: number): Promise<UserDetailInterface> {
    const data = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...others } = data;

      return {
        message: 'User details successfully found.',
        data: others,
      };
    }

    throw new NotFoundException();
  }
}
