import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HealthController } from './health.controller'
import { DatabaseIndicator } from './database.health'

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [DatabaseIndicator],
})
export class HealthModule {}
