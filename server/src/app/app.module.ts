import { Module, Global } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from '../prisma.service'
import { ThrottlerModule } from '@nestjs/throttler'
import { HealthModule } from '../health/health.module'
import { UserModule } from '../user/user.module'
import { AuthModule } from '../auth/auth.module'

@Global()
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    HealthModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
