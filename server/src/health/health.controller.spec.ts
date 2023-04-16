import { Test, TestingModule } from '@nestjs/testing'
import { HealthController } from './health.controller'
import { DatabaseIndicator } from './database.health'
import { TerminusModule } from '@nestjs/terminus'
import { PrismaService } from '../prisma.service'

describe('HealthController', () => {
  let controller: HealthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [DatabaseIndicator, PrismaService],
    }).compile()

    controller = module.get<HealthController>(HealthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
