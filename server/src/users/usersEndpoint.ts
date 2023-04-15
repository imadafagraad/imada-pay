import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Response,
  Route,
  Security,
  SuccessResponse,
} from 'tsoa'
import { User } from '@prisma/client'
import users, { UserCreationParams } from './usersService'

@Security('jwt')
@Route('users')
export class UsersEndpoint extends Controller {
  @Get()
  @Security('jwt', ['users:read'])
  @Response('401', 'Authentication failed')
  public async getUsers(): Promise<User[]> {
    return users.getAll()
  }

  @Get('{userId}')
  @Security('jwt', ['users:read'])
  @Response('401', 'Authentication failed')
  @Response('404', 'User with `userId` was not found')
  public async getUser(@Path() userId: number): Promise<User | undefined> {
    const user = await users.get(userId)
    if (user == null) {
      this.setStatus(404)
      return
    }

    return user
  }

  @Post()
  @Security('jwt', ['users:write'])
  @SuccessResponse('201', 'Created')
  @Response('401', 'Authentication failed')
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<User> {
    this.setStatus(201) // set return status 201
    return await users.create(requestBody)
  }
}
