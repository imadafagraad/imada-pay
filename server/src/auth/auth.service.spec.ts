import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { AuthTokenService } from './auth-token.service'
import { UserService } from '../user/user.service'
import { PrismaService } from '../prisma.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, AuthTokenService, UserService, PrismaService],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
