import { Injectable } from '@nestjs/common'
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus'
import { PrismaService } from '../prisma.service'

@Injectable()
export class DatabaseIndicator extends HealthIndicator {
  private readonly KEY = 'database'

  constructor(private prisma: PrismaService) {
    super()
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    try {
      await this.prisma.$queryRaw`SELECT 1`
    } catch (err) {
      const result = this.getStatus(this.KEY, false, err)
      throw new HealthCheckError('Dogcheck failed', result)
    }

    return this.getStatus(this.KEY, true, null)
  }
}
