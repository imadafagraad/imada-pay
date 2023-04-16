import { Controller, Get, Post, Body } from '@nestjs/common'
import { AppService } from './app.service'
import { UserService } from '../user.service'
import { User } from '@prisma/client'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('user')
  async signupUser(
    @Body()
    userData: {
      name: string
      email: string
      rfidCard: string
      password: string
    }
  ): Promise<User> {
    return this.userService.createUser(userData)
  }
}
