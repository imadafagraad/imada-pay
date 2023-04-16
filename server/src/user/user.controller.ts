import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './models/create-user.dto'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger'
import { UserDTO } from './models/user.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Register a new user
   * @param userData the parameters used to create the new user
   * @returns the new user
   */
  @Post()
  @ApiCreatedResponse({ description: 'User created', type: UserDTO })
  @ApiConflictResponse({ description: 'Email or RFID Card already registered' })
  @ApiBadRequestResponse({ description: 'Invalid parameters' })
  async signupUser(
    @Body()
    userData: CreateUserDto
  ): Promise<UserDTO> {
    const user = await this.userService.createUser(userData)
    return new UserDTO(user)
  }
}
