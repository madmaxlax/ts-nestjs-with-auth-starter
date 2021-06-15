import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { ProductModelProductDescription } from "./ProductModelProductDescription";

@Index("AK_ProductModel_Name", ["name"], { unique: true })
@Index("AK_ProductModel_rowguid", ["rowguid"], { unique: true })
@Index("PK_ProductModel_ProductModelID", ["productModelId"], { unique: true })
@Entity("ProductModel", { schema: "SalesLT" })
export class ProductModel {
  @PrimaryGeneratedColumn({ type: "int", name: "ProductModelID" })
  productModelId: number;

  @Column("nvarchar", { name: "Name", unique: true, length: 50 })
  name: string;

  @Column("xml", { name: "CatalogDescription", nullable: true })
  catalogDescription: string | null;

  @Column("uniqueidentifier", {
    name: "rowguid",
    unique: true,
    default: () => "newid()",
  })
  rowguid: string;

  @Column("datetime", { name: "ModifiedDate", default: () => "getdate()" })
  modifiedDate: Date;

  @OneToMany(() => Product, (product) => product.productModel)
  products: Product[];

  @OneToMany(
    () => ProductModelProductDescription,
    (productModelProductDescription) =>
      productModelProductDescription.productModel
  )
  productModelProductDescriptions: ProductModelProductDescription[];
}
