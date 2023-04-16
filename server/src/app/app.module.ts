import { Module, Global } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserService } from '../user.service'
import { PrismaService } from '../prisma.service'
import { ThrottlerModule } from '@nestjs/throttler'
import { HealthModule } from 'src/health/health.module'

@Global()
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
