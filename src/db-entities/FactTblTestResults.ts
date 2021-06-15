import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Sites } from './DimTblSites';
import { TestTypes } from './DimTblTestTypes';
import { TestResultTypes } from './DimTblTestResultTypes';

@Index('fkIdx_116', ['resultTypeId'], {})
@Index('fkIdx_27', ['testTypeId'], {})
@Index('fkIdx_30', ['siteId'], {})
@Index('PK_tbl_test_results', ['testResultId'], { unique: true })
@Entity('fact_tbl_test_results', {
  schema: 'api',
  synchronize: true,
})
export class TestResults {
  @Column('uniqueidentifier', { primary: true, name: 'test_result_id', default: () => 'NewID()' })
  testResultId: string;

  @Column('uniqueidentifier', { name: 'test_type_id' })
  testTypeId: string;

  @Column('uniqueidentifier', { name: 'site_id' })
  siteId: string;

  @Column('datetime', { name: 'timestamp' })
  timestamp: Date;

  @Column('uniqueidentifier', { name: 'result_type_id' })
  resultTypeId: string;

  @ManyToOne(() => Sites, (dimTblSites) => dimTblSites.factTblTestResults)
  @JoinColumn([{ name: 'site_id', referencedColumnName: 'siteId' }])
  site: Sites;

  @ManyToOne(() => TestTypes, (dimTblTestTypes) => dimTblTestTypes.factTblTestResults)
  @JoinColumn([{ name: 'test_type_id', referencedColumnName: 'testTypeId' }])
  testType: TestTypes;

  @ManyToOne(
    () => TestResultTypes,
    (dimTblTestResultTypes) => dimTblTestResultTypes.factTblTestResults
  )
  @JoinColumn([{ name: 'result_type_id', referencedColumnName: 'resultTypeId' }])
  resultType: TestResultTypes;
}
