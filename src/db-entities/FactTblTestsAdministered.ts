import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { TestTypes } from './DimTblTestTypes';
import { Sites } from './DimTblSites';

@Index('fkIdx_39', ['testTypeId'], {})
@Index('fkIdx_42', ['siteId'], {})
@Index('PK_tbl_tests_administered', ['testAdminId'], { unique: true })
@Entity('fact_tbl_tests_administered', {
  schema: 'api',
  synchronize: true,
})
export class TestsAdministered {
  @Column('uniqueidentifier', { primary: true, name: 'test_admin_id', default: () => 'NewID()' })
  testAdminId: string;

  @Column('datetime', { name: 'timestamp' })
  timestamp: Date;

  @Column('uniqueidentifier', { name: 'test_type_id' })
  testTypeId: string;

  @Column('uniqueidentifier', { name: 'site_id' })
  siteId: string;

  @Column('binary', { name: 'tested_recently', nullable: true, length: 1 })
  testedRecently: Buffer | null;

  @Column('date', { name: 'most_recent_test_date', nullable: true })
  mostRecentTestDate: Date | null;

  @ManyToOne(() => TestTypes, (dimTblTestTypes) => dimTblTestTypes.factTblTestsAdministereds)
  @JoinColumn([{ name: 'test_type_id', referencedColumnName: 'testTypeId' }])
  testType: TestTypes;

  @ManyToOne(() => Sites, (dimTblSites) => dimTblSites.factTblTestsAdministereds)
  @JoinColumn([{ name: 'site_id', referencedColumnName: 'siteId' }])
  site: Sites;
}
