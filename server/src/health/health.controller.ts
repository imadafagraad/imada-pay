import { Controller, Get } from '@nestjs/common'
import { HealthCheck, HealthCheckService } from '@nestjs/terminus'
import { DatabaseIndicator } from './database.health'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private databaseHealthIndicator: DatabaseIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.databaseHealthIndicator.isHealthy()])
  }
}
