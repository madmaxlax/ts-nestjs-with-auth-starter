import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'SalesLT', name: 'Customer', synchronize: !true })
export class Customer {
  @PrimaryGeneratedColumn()
  CustomerID: number;

  @Column()
  NameStyle: string;

  @Column()
  Title: string;

  @Column()
  FirstName: string;

  @Column()
  MiddleName: string;

  @Column()
  LastName: string;

  @Column()
  Suffix: string;

  @Column()
  CompanyName: string;

  @Column()
  SalesPerson: string;

  @Column()
  EmailAddress: string;

  @Column()
  Phone: string;

  @Column()
  PasswordHash: string;

  @Column()
  PasswordSalt: string;

  @Column()
  rowguid: string;

  @Column()
  ModifiedDate: string;
}
