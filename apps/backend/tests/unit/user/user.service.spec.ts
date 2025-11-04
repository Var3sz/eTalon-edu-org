import { ConflictException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

jest.mock('bcrypt', () => {
  hash: jest.fn().mockResolvedValue('hashed_pw');
});

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = {
      location: {
        findMany: jest.fn(),
      },
    } as unknown as PrismaService;
    userService = new UserService(prismaService);
  });

  describe('Create a new user', () => {
    const dto: CreateUserDto = {
      email: 'test@user.com',
      password: 'Secret123!',
      name: 'Test User',
    };

    it('If the email is taken, then it throws a ConflictException', async () => {
      (prismaService as any).user.findUnique.mockResolvedValue(dto);

      await expect(userService.create(dto)).rejects.toBeInstanceOf(ConflictException);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({ where: { email: dto.email } });
      expect(prismaService.user.create).not.toHaveBeenCalled();
    });

    it('új user létrehozása: hash-eli a jelszót, role connect (id=1), és nem ad vissza password-öt', async () => {
      (prismaService as any).user.findUnique.mockResolvedValue(null);

      const createdUserDbRow = {
        id: 1,
        email: dto.email,
        name: dto.name,
        password: 'hashed_pw',
        sessionCookie: null,
        agentKey: null,
        roleId: 1,
      };

      prismaService.user.create({ data: createdUserDbRow });

      const result = await userService.create(dto);

      // bcrypt.hash meghívódik
      expect(hash).toHaveBeenCalledWith(dto.password, 10);

      // Prisma create a megfelelő adatokkal hívódik
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...dto,
          role: { connect: { id: 1 } },
          password: 'hashed_pw',
          sessionCookie: null,
          agentKey: null,
        },
      });

      expect(result).toEqual({
        id: 1,
        email: dto.email,
        name: dto.name,
        sessionCookie: null,
        agentKey: null,
        roleId: 1,
      });

      expect((result as any).password).toBeUndefined();
    });
  });
});
