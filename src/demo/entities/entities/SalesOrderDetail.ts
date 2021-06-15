import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SalesOrderHeader } from "./SalesOrderHeader";
import { Product } from "./Product";

@Index("AK_SalesOrderDetail_rowguid", ["rowguid"], { unique: true })
@Index("IX_SalesOrderDetail_ProductID", ["productId"], {})
@Index(
  "PK_SalesOrderDetail_SalesOrderID_SalesOrderDetailID",
  ["salesOrderId", "salesOrderDetailId"],
  { unique: true }
)
@Entity("SalesOrderDetail", { schema: "SalesLT" })
export class SalesOrderDetail {
  @Column("int", { primary: true, name: "SalesOrderID" })
  salesOrderId: number;

  @PrimaryGeneratedColumn({ type: "int", name: "SalesOrderDetailID" })
  salesOrderDetailId: number;

  @Column("smallint", { name: "OrderQty" })
  orderQty: number;

  @Column("int", { name: "ProductID" })
  productId: number;

  @Column("money", { name: "UnitPrice" })
  unitPrice: number;

  @Column("money", { name: "UnitPriceDiscount", default: () => "(0.0)" })
  unitPriceDiscount: number;

  @Column("numeric", { name: "LineTotal", precision: 38, scale: 6 })
  lineTotal: number;

  @Column("uniqueidentifier", {
    name: "rowguid",
    unique: true,
    default: () => "newid()",
  })
  rowguid: string;

  @Column("datetime", { name: "ModifiedDate", default: () => "getdate()" })
  modifiedDate: Date;

  @ManyToOne(
    () => SalesOrderHeader,
    (salesOrderHeader) => salesOrderHeader.salesOrderDetails,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "SalesOrderID", referencedColumnName: "salesOrderId" }])
  salesOrder: SalesOrderHeader;

  @ManyToOne(() => Product, (product) => product.salesOrderDetails)
  @JoinColumn([{ name: "ProductID", referencedColumnName: "productId" }])
  product: Product;
}
