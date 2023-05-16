import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:4200','http://localhost:3000']
  });

  const config = new DocumentBuilder()
    .setTitle('Nestjs Api Structure with auth')
    .setDescription('Nestjs Api Structure with auth')
    .setVersion('1.0')
    //.addTag('cats')
    //for cookie auth
    .addCookieAuth('auth-cookie')
    // for bearer auth
    //.addBearerAuth({ type: 'http', schema: 'Bearer', bearerFormat: 'Token' } as SecuritySchemeObject, 'Bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT);
}
bootstrap();
