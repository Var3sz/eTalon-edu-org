import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';

import { CreateUserDto, ProfileDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new ConflictException('Email is already in use');

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        role: { connect: { id: 1 } },
        password: await hash(dto.password, 10),
        sessionCookie: null,
        agentKey: null,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findById(id: number): Promise<ProfileDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new UnauthorizedException();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }
}
