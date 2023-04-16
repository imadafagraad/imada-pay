import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { PrismaService } from './prisma.service'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // make sure shutdown happens gracefully
  const prismaSerice = app.get(PrismaService)
  await prismaSerice.enableShutdownHooks(app)

  const config = new DocumentBuilder()
    .setTitle('IMADAPAY')
    .setDescription('Betalingsløsning API for drikkevare på IMADA')
    .setVersion(process.env.npm_package_version)
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
