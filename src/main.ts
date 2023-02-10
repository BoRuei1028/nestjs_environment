import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MyLogger } from './my-logger.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(process.env.NODE_ENV),
  });

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('This is a basic Swagger document.')
    .setVersion('1.0')
    .addBasicAuth() //新增授權
    .addTag('Stock')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    explorer: true, // 開啟搜尋列
  };
  SwaggerModule.setup('api', app, document, options); //path: api ; options(SwaggerCustomOptions)
  
  await app.listen(4000);
}
bootstrap();
