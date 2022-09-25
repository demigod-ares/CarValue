import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor { // Give me any Class as input
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) { // Created our own decorator like ClassSerializerInterceptor
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    console.log(`Inside Serialize(${this.dto}) interceptor running. Runs before request reaches controller method.`);
    // console.debug('Information on incomming request: ', context); // huge JSON
    // console.debug('Reference to request handler in controller: ', handler); // Handler function
    // returns rxjs observable
    return handler.handle().pipe(
      map((data: any) => {
        console.log('Serialize Interceptor handeler.handle() method running before sending response');
        console.log('Unmodified response data is :', data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
