import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { routesV1 } from '@src/configs/routes';

@Controller(routesV1.version)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(routesV1.user.create)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(routesV1.user.list)
  findAll() {
    return this.userService.findAllUser();
  }
}
