import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
// import { JwtStrategy } from './jwt.strategy';
import { AccessJwtStrategy, RefreshStrategy } from './strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      // secret: jwtConstants.secret,
      // signOptions: { expiresIn: '1060s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // LocalStrategy, JwtStrategy
    AccessJwtStrategy,
    RefreshStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
