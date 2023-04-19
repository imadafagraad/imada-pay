import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { User, AuthToken } from '@prisma/client'
import { AuthTokenService } from './auth-token.service'
import jwt from 'jsonwebtoken'
import { RegisterUserDto } from './models/register-user.dto'

export type UserJWT = string

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private authTokenService: AuthTokenService
  ) {}

  async signIn(email: string, password: string): Promise<AuthToken> {
    const user = await this.userService.user({ email })
    if (!user) throw new UnauthorizedException()

    const passwordMatch = await this.comparePassword(user, password)
    if (!passwordMatch) throw new UnauthorizedException()

    return await this.generateAuthToken(user)
  }

  async registerUser(userData: RegisterUserDto): Promise<AuthToken> {
    throw 'not implemented yet'
  }

  async generateAuthToken(user: User): Promise<AuthToken> {
    const expire = new Date(Date.now() + 1000 * 86400) // +24 hours
    const tokenValue = crypto.randomBytes(64).toString('base64url')

    const token = await this.authTokenService.createToken({
      user: {
        connect: {
          id: user.id,
        },
      },
      expire,
      token: tokenValue,
    })

    return token
  }

  async comparePassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.passwordHash)
  }

  tokenToJWT(token: AuthToken): string {
    return jwt.sign({}, '[secret]', {
      subject: token.userId.toString(),
      expiresIn: (token.expire.getTime() - Date.now()) / 1000,
    })
  }
}
