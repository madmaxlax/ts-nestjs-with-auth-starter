import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductCategory } from "./ProductCategory";
import { ProductModel } from "./ProductModel";
import { SalesOrderDetail } from "./SalesOrderDetail";

@Index("AK_Product_Name", ["name"], { unique: true })
@Index("AK_Product_ProductNumber", ["productNumber"], { unique: true })
@Index("AK_Product_rowguid", ["rowguid"], { unique: true })
@Index("PK_Product_ProductID", ["productId"], { unique: true })
@Entity("Product", { schema: "SalesLT" })
export class Product {
  @PrimaryGeneratedColumn({ type: "int", name: "ProductID" })
  productId: number;

  @Column("nvarchar", { name: "Name", unique: true, length: 50 })
  name: string;

  @Column("nvarchar", { name: "ProductNumber", unique: true, length: 25 })
  productNumber: string;

  @Column("nvarchar", { name: "Color", nullable: true, length: 15 })
  color: string | null;

  @Column("money", { name: "StandardCost" })
  standardCost: number;

  @Column("money", { name: "ListPrice" })
  listPrice: number;

  @Column("nvarchar", { name: "Size", nullable: true, length: 5 })
  size: string | null;

  @Column("decimal", { name: "Weight", nullable: true, precision: 8, scale: 2 })
  weight: number | null;

  @Column("datetime", { name: "SellStartDate" })
  sellStartDate: Date;

  @Column("datetime", { name: "SellEndDate", nullable: true })
  sellEndDate: Date | null;

  @Column("datetime", { name: "DiscontinuedDate", nullable: true })
  discontinuedDate: Date | null;

  @Column("varbinary", { name: "ThumbNailPhoto", nullable: true })
  thumbNailPhoto: Buffer | null;

  @Column("nvarchar", {
    name: "ThumbnailPhotoFileName",
    nullable: true,
    length: 50,
  })
  thumbnailPhotoFileName: string | null;

  @Column("uniqueidentifier", {
    name: "rowguid",
    unique: true,
    default: () => "newid()",
  })
  rowguid: string;

  @Column("datetime", { name: "ModifiedDate", default: () => "getdate()" })
  modifiedDate: Date;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.products
  )
  @JoinColumn([
    { name: "ProductCategoryID", referencedColumnName: "productCategoryId" },
  ])
  productCategory: ProductCategory;

  @ManyToOne(() => ProductModel, (productModel) => productModel.products)
  @JoinColumn([
    { name: "ProductModelID", referencedColumnName: "productModelId" },
  ])
  productModel: ProductModel;

  @OneToMany(
    () => SalesOrderDetail,
    (salesOrderDetail) => salesOrderDetail.product
  )
  salesOrderDetails: SalesOrderDetail[];
}
