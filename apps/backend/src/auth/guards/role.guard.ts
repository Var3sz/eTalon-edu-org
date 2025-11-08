import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as process from 'node:process';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT,
      });

      const user = await this.userService.findByEmail(payload.username);

      // ide kerül be a user
      request['user'] = payload;

      // admin ellenőrzés
      if (user.roleId !== 1) {
        throw new ForbiddenException('Admin privileges required');
      }

      return true;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  private extractTokenFromHeader(request: Request) {
    const auth = request.headers.authorization;
    if (!auth) return undefined;
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
