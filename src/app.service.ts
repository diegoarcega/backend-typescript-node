import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(who?: string): string {
    return `Hello ${who || 'world'}`;
  }
}
