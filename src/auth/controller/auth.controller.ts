import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { routesV1 } from '@src/configs/routes';
import { AuthService } from '@src/auth/auth.service';
import { Public } from '@src/auth/decorator';
import { LoginDto } from '@src/auth/dto/login.request.dto';
import { LoginResponseDto } from '@src/auth/dto/login.response.dto';

@Controller(routesV1.version)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post(routesV1.auth.login)
  async signIn(@Body() login: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.signIn(login.username, login.password);
  }
}
