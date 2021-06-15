import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';
import { LocalAuthGuard } from 'src/auth/local.strategy';
import { Customer } from './customer.entity';
import { DemoService } from './demo.service';

@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  async getCustomers(): Promise<Customer[]> {
    const customers = await this.demoService.findAll();
    return customers;
  }

  @UseGuards(LocalAuthGuard)
  @Get('authtest')
  async loginTest(): Promise<string> {
    return 'authd';
  }

  @UseGuards(JwtAuthGuard)
  @Get('jwtauthtest')
  async jwtTest(): Promise<string> {
    return 'authd';
  }
}
