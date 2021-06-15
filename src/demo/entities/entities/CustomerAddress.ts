import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Customer } from "./Customer";
import { Address } from "./Address";

@Index("AK_CustomerAddress_rowguid", ["rowguid"], { unique: true })
@Index("PK_CustomerAddress_CustomerID_AddressID", ["customerId", "addressId"], {
  unique: true,
})
@Entity("CustomerAddress", { schema: "SalesLT" })
export class CustomerAddress {
  @Column("int", { primary: true, name: "CustomerID" })
  customerId: number;

  @Column("int", { primary: true, name: "AddressID" })
  addressId: number;

  @Column("nvarchar", { name: "AddressType", length: 50 })
  addressType: string;

  @Column("uniqueidentifier", {
    name: "rowguid",
    unique: true,
    default: () => "newid()",
  })
  rowguid: string;

  @Column("datetime", { name: "ModifiedDate", default: () => "getdate()" })
  modifiedDate: Date;

  @ManyToOne(() => Customer, (customer) => customer.customerAddresses)
  @JoinColumn([{ name: "CustomerID", referencedColumnName: "customerId" }])
  customer: Customer;

  @ManyToOne(() => Address, (address) => address.customerAddresses)
  @JoinColumn([{ name: "AddressID", referencedColumnName: "addressId" }])
  address: Address;
}
