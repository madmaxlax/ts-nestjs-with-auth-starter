import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Index("AK_ProductCategory_Name", ["name"], { unique: true })
@Index("AK_ProductCategory_rowguid", ["rowguid"], { unique: true })
@Index("PK_ProductCategory_ProductCategoryID", ["productCategoryId"], {
  unique: true,
})
@Entity("ProductCategory", { schema: "SalesLT" })
export class ProductCategory {
  @PrimaryGeneratedColumn({ type: "int", name: "ProductCategoryID" })
  productCategoryId: number;

  @Column("nvarchar", { name: "Name", unique: true, length: 50 })
  name: string;

  @Column("uniqueidentifier", {
    name: "rowguid",
    unique: true,
    default: () => "newid()",
  })
  rowguid: string;

  @Column("datetime", { name: "ModifiedDate", default: () => "getdate()" })
  modifiedDate: Date;

  @OneToMany(() => Product, (product) => product.productCategory)
  products: Product[];

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.productCategories
  )
  @JoinColumn([
    {
      name: "ParentProductCategoryID",
      referencedColumnName: "productCategoryId",
    },
  ])
  parentProductCategory: ProductCategory;

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.parentProductCategory
  )
  productCategories: ProductCategory[];
}
