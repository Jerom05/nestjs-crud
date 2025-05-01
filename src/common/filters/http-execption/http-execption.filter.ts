import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import e, { Response } from 'express';

@Catch()
export class HttpExecptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse();
    const status = exception.getStatus ? exception.getStatus() : 500;

    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as Object);

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
