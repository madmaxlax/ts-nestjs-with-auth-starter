import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class DemoService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    private connection: Connection
  ) {}

  async findAll(): Promise<Customer[]> {
    // const queryRunner = this.connection.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();

    // return this.customersRepository.find();
    const customers = await this.customersRepository.find();
    console.log(customers);
    return customers;
  }

  findOne(id: string): Promise<Customer> {
    return this.customersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.customersRepository.delete(id);
  }
}
