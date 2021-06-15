import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DemoController } from './demo/demo.controller';
import { DemoModule } from './demo/demo.module';
import { DemoService } from './demo/demo.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
   
    DemoModule,
    AuthModule,
  
  ],
  controllers: [
    AppController,
  
    DemoController,
  ],
  providers: [AppService, DemoService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
