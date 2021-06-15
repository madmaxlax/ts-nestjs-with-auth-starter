import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [DemoService],
  controllers: [DemoController],
  exports: [TypeOrmModule],
})
export class DemoModule {}
