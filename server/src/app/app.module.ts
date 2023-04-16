import { Module, Global } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserService } from '../user/user.service'
import { PrismaService } from '../prisma.service'
import { ThrottlerModule } from '@nestjs/throttler'
import { HealthModule } from 'src/health/health.module'
import { UserController } from 'src/user/user.controller'

@Global()
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    HealthModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
