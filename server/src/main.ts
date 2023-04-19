import * as dotenv from 'dotenv'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { PrismaService } from './prisma.service'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter'

dotenv.config()

const PORT = Number.parseInt(process.env['PORT'] || '3000')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // make sure shutdown happens gracefully
  const prismaSerice = app.get(PrismaService)
  await prismaSerice.enableShutdownHooks(app)

  // enable autogeneration of OpenAPI documentation at /api
  const config = new DocumentBuilder()
    .setTitle('IMADAPAY')
    .setDescription(
      'Payment API for drinks at IMADA, go to [`/api-json`](/api-json) to download the json version of this document.'
    )
    .setContact(
      'IMADA Fagråd',
      'https://imadafagraad.dk',
      'kontakt@imadafagraad.dk'
    )
    .setVersion(process.env['npm_package_version'] ?? 'UNVERSIONED')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  // enable auto validation of all endpoints
  app.useGlobalPipes(new ValidationPipe())

  // add exception handing for Prisma exceptions
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  await app.listen(PORT)
  console.log(`💸 IMADAPAY server listening on http://localhost:${PORT}`)
}

bootstrap()
