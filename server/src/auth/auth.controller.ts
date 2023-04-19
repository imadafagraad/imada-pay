import { Controller, Post, Body } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { RegisterUserDto } from './models/register-user.dto'
import { AuthService, UserJWT } from './auth.service'
import { AuthTokenResponseDTO } from './models/auth-response.dto'
import { LoginUserDto } from './models/login-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Authenticate user with `email` and `password`
   * @param userData the parameters used to authenticate the user
   * @returns an auth token for the authenticated user
   */
  @Post('login')
  @ApiCreatedResponse({
    description: 'User authenticated',
    type: AuthTokenResponseDTO,
  })
  @ApiBadRequestResponse({ description: 'Invalid parameters' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async signInUser(
    @Body()
    userData: LoginUserDto
  ): Promise<UserJWT> {
    const token = await this.authService.signIn(
      userData.email,
      userData.password
    )
    return this.authService.tokenToJWT(token)
  }

  /**
   * Register a new user
   * @param userData the parameters used to create the new user
   * @returns an auth token for the newly registered user
   */
  @Post('register')
  @ApiCreatedResponse({
    description: 'User registered',
    type: AuthTokenResponseDTO,
  })
  @ApiConflictResponse({ description: 'Email or RFID Card already registered' })
  @ApiBadRequestResponse({ description: 'Invalid parameters' })
  async signUpUser(
    @Body()
    userData: RegisterUserDto
  ): Promise<UserJWT> {
    const token = await this.authService.registerUser(userData)
    return this.authService.tokenToJWT(token)
  }
}
