import { Column, Entity, Index, OneToMany } from 'typeorm';
import { TestResults } from './FactTblTestResults';

@Index('PK_dim_tbl_test_result_types', ['resultTypeId'], { unique: true })
@Entity('dim_tbl_test_result_types', {
  schema: 'api',
  synchronize: true,
})
export class TestResultTypes {
  @Column('uniqueidentifier', { primary: true, name: 'result_type_id', default: () => 'NewID()' })
  resultTypeId: string;

  @Column('nvarchar', { name: 'result_name', length: 250 })
  resultName: string;

  @Column('nvarchar', { name: 'result_name_fr', length: 250 })
  resultNameFr: string;

  @OneToMany(() => TestResults, (factTblTestResults) => factTblTestResults.resultType)
  factTblTestResults: TestResults[];
}
