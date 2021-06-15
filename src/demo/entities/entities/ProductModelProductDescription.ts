import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { ProductModel } from "./ProductModel";
import { ProductDescription } from "./ProductDescription";

@Index("AK_ProductModelProductDescription_rowguid", ["rowguid"], {
  unique: true,
})
@Index(
  "PK_ProductModelProductDescription_ProductModelID_ProductDescriptionID_Culture",
  ["productModelId", "productDescriptionId", "culture"],
  { unique: true }
)
@Entity("ProductModelProductDescription", { schema: "SalesLT" })
export class ProductModelProductDescription {
  @Column("int", { primary: true, name: "ProductModelID" })
  productModelId: number;

  @Column("int", { primary: true, name: "ProductDescriptionID" })
  productDescriptionId: number;

  @Column("nchar", { primary: true, name: "Culture", length: 6 })
  culture: string;

  @Column("uniqueidentifier", {
    name: "rowguid",
    unique: true,
    default: () => "newid()",
  })
  rowguid: string;

  @Column("datetime", { name: "ModifiedDate", default: () => "getdate()" })
  modifiedDate: Date;

  @ManyToOne(
    () => ProductModel,
    (productModel) => productModel.productModelProductDescriptions
  )
  @JoinColumn([
    { name: "ProductModelID", referencedColumnName: "productModelId" },
  ])
  productModel: ProductModel;

  @ManyToOne(
    () => ProductDescription,
    (productDescription) => productDescription.productModelProductDescriptions
  )
  @JoinColumn([
    {
      name: "ProductDescriptionID",
      referencedColumnName: "productDescriptionId",
    },
  ])
  productDescription: ProductDescription;
}
