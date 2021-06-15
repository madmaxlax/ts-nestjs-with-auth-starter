import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoService {
  constructor() {}

  doSomething() {
    return 'data';
  }
}
