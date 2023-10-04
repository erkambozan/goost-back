import { Module } from '@nestjs/common';
import { AuthController } from '@src/auth/controller/auth.controller';
import { AuthService } from '@src/auth/auth.service';
import { jwtConstants } from '@src/auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '@src/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { User } from '@src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
