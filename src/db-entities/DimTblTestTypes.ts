import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ShipmentDetailsFedToPt } from './FactTblShipmentDetailsFedToPt';
import { ShipmentDetailsPtToSite } from './FactTblShipmentDetailsPtToSite';
import { TestResults } from './FactTblTestResults';
import { TestsAdministered } from './FactTblTestsAdministered';

@Index('PK_tbl_test_types', ['testTypeId'], { unique: true })
@Entity('dim_tbl_test_types', {
  schema: 'api',
  synchronize: true,
})
export class TestTypes {
  @Column('uniqueidentifier', { primary: true, name: 'test_type_id', default: () => 'NewID()' })
  testTypeId: string;

  @Column('nvarchar', { name: 'test_type_name', length: 250 })
  testTypeName: string;

  @Column('nvarchar', { name: 'test_type_name_fr', length: 250 })
  testTypeNameFr: string;

  @OneToMany(
    () => ShipmentDetailsFedToPt,
    (factTblShipmentDetailsFedToPt) => factTblShipmentDetailsFedToPt.testType
  )
  factTblShipmentDetailsFedToPts: ShipmentDetailsFedToPt[];

  @OneToMany(
    () => ShipmentDetailsPtToSite,
    (factTblShipmentDetailsPtToSite) => factTblShipmentDetailsPtToSite.testType
  )
  factTblShipmentDetailsPtToSites: ShipmentDetailsPtToSite[];

  @OneToMany(() => TestResults, (factTblTestResults) => factTblTestResults.testType)
  factTblTestResults: TestResults[];

  @OneToMany(
    () => TestsAdministered,
    (factTblTestsAdministered) => factTblTestsAdministered.testType
  )
  factTblTestsAdministereds: TestsAdministered[];
}
