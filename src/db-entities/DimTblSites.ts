import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProvincesTerritoriesRegions } from './DimTblProvincesTerritoriesRegions';
import { SitesUseCase } from './DimTblSitesUseCase';
import { TestResults } from './FactTblTestResults';
import { TestsAdministered } from './FactTblTestsAdministered';

@Index('fkIdx_103', ['siteUseCaseId'], {})
@Index('fkIdx_17', ['sitePtId'], {})
@Index('PK_tbl_sites', ['siteId'], { unique: true })
@Entity('dim_tbl_sites', {
  schema: 'api',
  synchronize: true,
})
export class Sites {
  @Column('uniqueidentifier', { primary: true, name: 'site_id', default: () => 'NewID()' })
  siteId: string;

  @Column('nvarchar', { name: 'site_name', nullable: true, length: 250 })
  siteName: string | null;

  @Column('nvarchar', { name: 'side_address1', nullable: true, length: 250 })
  sideAddress1: string | null;

  @Column('uniqueidentifier', { name: 'site_pt_id' })
  sitePtId: string;

  @Column('nvarchar', { name: 'site_name_fr', nullable: true, length: 250 })
  siteNameFr: string | null;

  @Column('uniqueidentifier', { name: 'site_use_case_id' })
  siteUseCaseId: string;

  @ManyToOne(
    () => ProvincesTerritoriesRegions,
    (dimTblProvincesTerritoriesRegions) => dimTblProvincesTerritoriesRegions.dimTblSites
  )
  @JoinColumn([{ name: 'site_pt_id', referencedColumnName: 'ptId' }])
  sitePt: ProvincesTerritoriesRegions;

  @ManyToOne(() => SitesUseCase, (dimTblSitesUseCase) => dimTblSitesUseCase.dimTblSites)
  @JoinColumn([{ name: 'site_use_case_id', referencedColumnName: 'siteUseCaseId' }])
  siteUseCase: SitesUseCase;

  @OneToMany(() => TestResults, (factTblTestResults) => factTblTestResults.site)
  factTblTestResults: TestResults[];

  @OneToMany(() => TestsAdministered, (factTblTestsAdministered) => factTblTestsAdministered.site)
  factTblTestsAdministereds: TestsAdministered[];
}
