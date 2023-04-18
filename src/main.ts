import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }));
  app.enableCors();
  const configService = app.get(ConfigService);
  console.log('Port number is: ', configService.get<string>('PORT'));
  const port: number = configService.get<number>('PORT') ?? 8003;
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true, // allow conversion underneath
      },
    })
  );

  const config = new DocumentBuilder()
    .setTitle('S3 Pre-Signed Url')
    .setDescription('ways to upload and download through preSigned URL in S3 bucket')
    .setVersion('v1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(port);
}
bootstrap();
