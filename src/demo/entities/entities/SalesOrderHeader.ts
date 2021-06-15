import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { SalesOrderDetail } from "./SalesOrderDetail";
import { Customer } from "./Customer";
import { Address } from "./Address";

@Index("AK_SalesOrderHeader_rowguid", ["rowguid"], { unique: true })
@Index("AK_SalesOrderHeader_SalesOrderNumber", ["salesOrderNumber"], {
  unique: true,
})
@Index("IX_SalesOrderHeader_CustomerID", ["customerId"], {})
@Index("PK_SalesOrderHeader_SalesOrderID", ["salesOrderId"], { unique: true })
@Entity("SalesOrderHeader", { schema: "SalesLT" })
export class SalesOrderHeader {
  @Column("int", {
    primary: true,
    name: "SalesOrderID",
    default: () => "NEXT VALUE FOR [SalesLT].[SalesOrderNumber]",
  })
  salesOrderId: number;

  @Column("tinyint", { name: "RevisionNumber", default: () => "(0)" })
  revisionNumber: number;

  @Column("datetime", { name: "OrderDate", default: () => "getdate()" })
  orderDate: Date;

  @Column("datetime", { name: "DueDate" })
  dueDate: Date;

  @Column("datetime", { name: "ShipDate", nullable: true })
  shipDate: Date | null;

  @Column("tinyint", { name: "Status", default: () => "(1)" })
  status: number;

  @Column("bit", { name: "OnlineOrderFlag", default: () => "(1)" })
  onlineOrderFlag: boolean;

  @Column("nvarchar", { name: "SalesOrderNumber", unique: true, length: 25 })
  salesOrderNumber: string;

  @Column("nvarchar", {
    name: "PurchaseOrderNumber",
    nullable: true,
    length: 25,
  })
  purchaseOrderNumber: string | null;

  @Column("nvarchar", { name: "AccountNumber", nullable: true, length: 15 })
  accountNumber: string | null;

  @Column("int", { name: "CustomerID" })
  customerId: number;

  @Column("nvarchar", { name: "ShipMethod", length: 50 })
  shipMethod: string;

  @Column("varchar", {
    name: "CreditCardApprovalCode",
    nullable: true,
    length: 15,
  })
  creditCardApprovalCode: string | null;

  @Column("money", { name: "SubTotal", default: () => "(0.00)" })
  subTotal: number;

  @Column("money", { name: "TaxAmt", default: () => "(0.00)" })
  taxAmt: number;

  @Column("money", { name: "Freight", default: () => "(0.00)" })
  freight: number;

  @Column("money", { name: "TotalDue" })
  totalDue: number;

  @Column("nvarchar", { name: "Comment", nullable: true })
  comment: string | null;

  @Column("uniqueidentifier", {
    name: "rowguid",
    unique: true,
    default: () => "newid()",
  })
  rowguid: string;

  @Column("datetime", { name: "ModifiedDate", default: () => "getdate()" })
  modifiedDate: Date;

  @OneToMany(
    () => SalesOrderDetail,
    (salesOrderDetail) => salesOrderDetail.salesOrder
  )
  salesOrderDetails: SalesOrderDetail[];

  @ManyToOne(() => Customer, (customer) => customer.salesOrderHeaders)
  @JoinColumn([{ name: "CustomerID", referencedColumnName: "customerId" }])
  customer: Customer;

  @ManyToOne(() => Address, (address) => address.salesOrderHeaders)
  @JoinColumn([{ name: "ShipToAddressID", referencedColumnName: "addressId" }])
  shipToAddress: Address;

  @ManyToOne(() => Address, (address) => address.salesOrderHeaders2)
  @JoinColumn([{ name: "BillToAddressID", referencedColumnName: "addressId" }])
  billToAddress: Address;
}
