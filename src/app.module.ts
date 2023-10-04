import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      password: process.env.DB_PASSWORD || 'postgres',
      username: process.env.DB_USERNAME || 'postgres',
      database: process.env.DB_DATABASE || 'goost',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations_typeorm',
      migrationsRun: true,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
