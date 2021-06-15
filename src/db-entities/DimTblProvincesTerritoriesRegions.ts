import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Sites } from './DimTblSites';
import { ShipmentDetailsFedToPt } from './FactTblShipmentDetailsFedToPt';
import { ShipmentFedToPtMetadata } from './FactTblShipmentFedToPtMetadata';
import { ShipmentPtToSiteMetadata } from './FactTblShipmentPtToSiteMetadata';

@Index('PK_tbl_previnces_territories', ['ptId'], { unique: true })
@Entity('dim_tbl_provinces_territories_regions', {
  schema: 'api',
  synchronize: true,
})
export class ProvincesTerritoriesRegions {
  @Column('uniqueidentifier', { primary: true, name: 'pt_id', default: () => 'NewID()' })
  ptId: string;

  @Column('nvarchar', { name: 'pt_name', length: 250 })
  ptName: string;

  @Column('nvarchar', { name: 'pt_name_fr', length: 250 })
  ptNameFr: string;

  @OneToMany(() => Sites, (dimTblSites) => dimTblSites.sitePt)
  dimTblSites: Sites[];

  @OneToMany(
    () => ShipmentDetailsFedToPt,
    (factTblShipmentDetailsFedToPt) => factTblShipmentDetailsFedToPt.pt
  )
  factTblShipmentDetailsFedToPts: ShipmentDetailsFedToPt[];

  @OneToMany(
    () => ShipmentFedToPtMetadata,
    (factTblShipmentFedToPtMetadata) => factTblShipmentFedToPtMetadata.pt
  )
  factTblShipmentFedToPtMetadata: ShipmentFedToPtMetadata[];

  @OneToMany(
    () => ShipmentPtToSiteMetadata,
    (factTblShipmentPtToSiteMetadata) => factTblShipmentPtToSiteMetadata.pt
  )
  factTblShipmentPtToSiteMetadata: ShipmentPtToSiteMetadata[];
}
