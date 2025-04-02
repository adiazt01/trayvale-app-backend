import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );

  const config = new DocumentBuilder()
    .setTitle('Trayvale API')
    .setDescription('The Trayvale API description')
    .setVersion('1.0')
    .addTag('trayvale')
    .build();

  const document = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document(), {
    swaggerOptions: {
      docExpansion: 'none',
      defaultModelsExpandDepth: -1,
    },
  });

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT);
}
bootstrap();
