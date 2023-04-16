import { AuthScope, AuthenticationError } from '../../authentication'
import {
  Body,
  Controller,
  Example,
  Get,
  Path,
  Post,
  Response,
  Route,
  Security,
  SuccessResponse,
} from 'tsoa'
import { AccessToken, User as DbUser } from '@prisma/client'
import users, {
  UserAuthorizationParams,
  UserCreationParams,
} from './usersService'

type User = Pick<DbUser, 'id' | 'email' | 'name' | 'rfidCard'>

const exampleUser: User = {
  id: 123,
  email: 'hello@example.com',
  name: 'John Doe',
  rfidCard: '1234-5678',
}

const exampleToken: AccessToken = {
  id: 42,
  expire: new Date(),
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.60yWEpN-IlVoMeaCh_WYOe5iyysOpSymC2g-YZ61mPM',
  userId: 123,
}

@Route('users')
export class UsersEndpoint extends Controller {
  /**
   * Get a list of all registered users
   */
  @Get()
  @Security('jwt', [AuthScope.UsersRead])
  @Response('401', 'Authentication failed')
  @Example<User>(exampleUser)
  public async getUsers(): Promise<User[]> {
    return users.getAll()
  }

  /**
   * Get details about a specific user
   */
  @Get('{userId}')
  @Security('jwt', [AuthScope.UsersRead])
  @Response('401', 'Authentication failed')
  @Response('404', 'User with `userId` was not found')
  @Example<User>(exampleUser)
  public async getUser(@Path() userId: number): Promise<User | undefined> {
    const user = await users.get(userId)
    if (user == null) {
      this.setStatus(404)
      return
    }

    return user
  }

  /**
   * Register a new user
   */
  @Post()
  @Security('jwt', [AuthScope.UsersWrite])
  @SuccessResponse('201', 'Created')
  @Response('401', 'Authentication failed')
  @Example<User>(exampleUser)
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<User> {
    this.setStatus(201) // set return status 201
    return await users.create(requestBody)
  }

  /**
   * Authenticate user using email and password
   */
  @Post('authenticate')
  @Response('401', 'Authentication failed')
  @Example<AccessToken>(exampleToken)
  public async authenticateUser(
    @Body() requestBody: UserAuthorizationParams
  ): Promise<AccessToken> {
    const token = await users.authorize(requestBody)
    if (token == null) throw new AuthenticationError('Invalid credentials')
    return token
  }
}
