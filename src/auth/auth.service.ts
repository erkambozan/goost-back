import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from '@src/auth/dto/login.response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/user/entities/user.entity';
import { UserRepositoryInterface } from '@src/user/repository/user.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOneBy({ username: username });

    if (!user) throw new NotFoundException();

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);
    const response = new LoginResponseDto();
    response.access_token = accessToken;
    return response;
  }
}
