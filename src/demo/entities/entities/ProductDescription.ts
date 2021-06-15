import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductModelProductDescription } from "./ProductModelProductDescription";

@Index("AK_ProductDescription_rowguid", ["rowguid"], { unique: true })
@Index("PK_ProductDescription_ProductDescriptionID", ["productDescriptionId"], {
  unique: true,
})
@Entity("ProductDescription", { schema: "SalesLT" })
export class ProductDescription {
  @PrimaryGeneratedColumn({ type: "int", name: "ProductDescriptionID" })
  productDescriptionId: number;

  @Column("nvarchar", { name: "Description", length: 400 })
  description: string;

  @Column("uniqueidentifier", {
    name: "rowguid",
    unique: true,
    default: () => "newid()",
  })
  rowguid: string;

  @Column("datetime", { name: "ModifiedDate", default: () => "getdate()" })
  modifiedDate: Date;

  @OneToMany(
    () => ProductModelProductDescription,
    (productModelProductDescription) =>
      productModelProductDescription.productDescription
  )
  productModelProductDescriptions: ProductModelProductDescription[];
}
