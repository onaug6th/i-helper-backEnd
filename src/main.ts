import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AuthGuard } from './guard/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor()); // 正常情况下，响应值统一
  app.useGlobalFilters(new HttpExceptionFilter()); // 异常情况下，响应值统一

  //  swagger文档，访问：启动地址:3000/swagger 即可查看自动生成的接口文档。
  const config = new DocumentBuilder()
    .setTitle('ihelper APIS')
    .setDescription('The ihelper API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
