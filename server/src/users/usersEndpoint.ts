import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Response,
  Route,
  SuccessResponse,
} from 'tsoa'
import { User } from '@prisma/client'
import users, { UserCreationParams } from './usersService'

@Route('users')
export class UsersController extends Controller {
  @Get()
  public async getUsers(): Promise<User[]> {
    return users.getAll()
  }

  @Get('{userId}')
  @Response('404', 'User with `userId` was not found')
  public async getUser(@Path() userId: number): Promise<User | undefined> {
    const user = await users.get(userId)
    if (user == null) {
      this.setStatus(404)
      return
    }

    return user
  }

  @SuccessResponse('201', 'Created')
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<User> {
    this.setStatus(201) // set return status 201
    return await users.create(requestBody)
  }
}
