import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExecptionFilter } from './common/filters/http-execption/http-execption.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExecptionFilter());
  app.useGlobalInterceptors(new WrapResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
