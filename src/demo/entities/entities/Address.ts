import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CustomerAddress } from "./CustomerAddress";
import { SalesOrderHeader } from "./SalesOrderHeader";

@Index("AK_Address_rowguid", ["rowguid"], { unique: true })
@Index(
  "IX_Address_AddressLine1_AddressLine2_City_StateProvince_PostalCode_CountryRegion",
  [
    "addressLine1",
    "addressLine2",
    "city",
    "stateProvince",
    "postalCode",
    "countryRegion",
  ],
  {}
)
@Index("IX_Address_StateProvince", ["stateProvince"], {})
@Index("PK_Address_AddressID", ["addressId"], { unique: true })
@Entity("Address", { schema: "SalesLT" })
export class Address {
  @PrimaryGeneratedColumn({ type: "int", name: "AddressID" })
  addressId: number;

  @Column("nvarchar", { name: "AddressLine1", length: 60 })
  addressLine1: string;

  @Column("nvarchar", { name: "AddressLine2", nullable: true, length: 60 })
  addressLine2: string | null;

  @Column("nvarchar", { name: "City", length: 30 })
  city: string;

  @Column("nvarchar", { name: "StateProvince", length: 50 })
  stateProvince: string;

  @Column("nvarchar", { name: "CountryRegion", length: 50 })
  countryRegion: string;

  @Column("nvarchar", { name: "PostalCode", length: 15 })
  postalCode: string;

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
    (customerAddress) => customerAddress.address
  )
  customerAddresses: CustomerAddress[];

  @OneToMany(
    () => SalesOrderHeader,
    (salesOrderHeader) => salesOrderHeader.shipToAddress
  )
  salesOrderHeaders: SalesOrderHeader[];

  @OneToMany(
    () => SalesOrderHeader,
    (salesOrderHeader) => salesOrderHeader.billToAddress
  )
  salesOrderHeaders2: SalesOrderHeader[];
}
