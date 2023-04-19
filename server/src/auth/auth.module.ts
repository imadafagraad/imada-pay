import { UserService } from '../user/user.service'
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthTokenService } from './auth-token.service'

@Module({
  controllers: [AuthController],
  providers: [UserService, AuthService, AuthTokenService],
})
export class AuthModule {}
