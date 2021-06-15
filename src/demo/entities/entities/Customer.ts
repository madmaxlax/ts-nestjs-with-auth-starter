import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CustomerAddress } from "./CustomerAddress";
import { SalesOrderHeader } from "./SalesOrderHeader";

@Index("AK_Customer_rowguid", ["rowguid"], { unique: true })
@Index("IX_Customer_EmailAddress", ["emailAddress"], {})
@Index("PK_Customer_CustomerID", ["customerId"], { unique: true })
@Entity("Customer", { schema: "SalesLT" })
export class Customer {
  @PrimaryGeneratedColumn({ type: "int", name: "CustomerID" })
  customerId: number;

  @Column("bit", { name: "NameStyle", default: () => "(0)" })
  nameStyle: boolean;

  @Column("nvarchar", { name: "Title", nullable: true, length: 8 })
  title: string | null;

  @Column("nvarchar", { name: "FirstName", length: 50 })
  firstName: string;

  @Column("nvarchar", { name: "MiddleName", nullable: true, length: 50 })
  middleName: string | null;

  @Column("nvarchar", { name: "LastName", length: 50 })
  lastName: string;

  @Column("nvarchar", { name: "Suffix", nullable: true, length: 10 })
  suffix: string | null;

  @Column("nvarchar", { name: "CompanyName", nullable: true, length: 128 })
  companyName: string | null;

  @Column("nvarchar", { name: "SalesPerson", nullable: true, length: 256 })
  salesPerson: string | null;

  @Column("nvarchar", { name: "EmailAddress", nullable: true, length: 50 })
  emailAddress: string | null;

  @Column("nvarchar", { name: "Phone", nullable: true, length: 25 })
  phone: string | null;

  @Column("varchar", { name: "PasswordHash", length: 128 })
  passwordHash: string;

  @Column("varchar", { name: "PasswordSalt", length: 10 })
  passwordSalt: string;

  @Column("uniqueidentifier", {
    name: "rowguid",
    unique: true,
    default: () => "newid()",
  })
  rowguid: string;

  @Column("datetime", { name: "ModifiedDate", default: () => "getdate()" })
  modifiedDate: Date;

  @OneToMany(
    () => CustomerAddress,
    (customerAddress) => customerAddress.customer
  )
  customerAddresses: CustomerAddress[];

  @OneToMany(
    () => SalesOrderHeader,
    (salesOrderHeader) => salesOrderHeader.customer
  )
  salesOrderHeaders: SalesOrderHeader[];
}
