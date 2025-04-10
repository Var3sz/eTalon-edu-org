import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { ProfileDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Success', type: [ProfileDto] })
  async getUserProfile(@Param('id') id: number) {
    return await this.userService.findById(id);
  }
}
