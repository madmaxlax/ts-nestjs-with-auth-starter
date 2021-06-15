import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Sites } from './DimTblSites';
import { ShipmentDetailsPtToSite } from './FactTblShipmentDetailsPtToSite';

@Index('PK_tbl_sites_clone', ['siteUseCaseId'], { unique: true })
@Entity('dim_tbl_sites_use_case', {
  schema: 'api',
  synchronize: true,
})
export class SitesUseCase {
  @Column('uniqueidentifier', { primary: true, name: 'site_use_case_id', default: () => 'NewID()' })
  siteUseCaseId: string;

  @Column('nvarchar', { name: 'use_case_name', nullable: true, length: 250 })
  useCaseName: string | null;

  @Column('nvarchar', { name: 'use_case_name_fr', length: 250 })
  useCaseNameFr: string;

  @OneToMany(() => Sites, (dimTblSites) => dimTblSites.siteUseCase)
  dimTblSites: Sites[];

  @OneToMany(
    () => ShipmentDetailsPtToSite,
    (factTblShipmentDetailsPtToSite) => factTblShipmentDetailsPtToSite.siteUseCase
  )
  factTblShipmentDetailsPtToSites: ShipmentDetailsPtToSite[];
}
