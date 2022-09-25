import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMessage(): string {
    console.log('Car Value application runnining on PORT 3000');

    return 'Hello! Welcome to my application runnining on PORT 3000';
  }
}
