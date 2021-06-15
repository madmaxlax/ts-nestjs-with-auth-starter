import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ShipmentDetailsPtToSite } from './FactTblShipmentDetailsPtToSite';
import { ProvincesTerritoriesRegions } from './DimTblProvincesTerritoriesRegions';

@Index('fkIdx_111', ['ptId'], {})
@Index('PK_fact_tbl_shipment_metadata', ['shipmentId'], { unique: true })
@Entity('fact_tbl_shipment_pt_to_site_metadata', {
  schema: 'api',
  synchronize: true,
})
export class ShipmentPtToSiteMetadata {
  @Column('uniqueidentifier', { primary: true, name: 'shipment_id', default: () => 'NewID()' })
  shipmentId: string;

  @Column('date', { name: 'shipment_date' })
  shipmentDate: Date;

  @Column('uniqueidentifier', { name: 'pt_id' })
  ptId: string;

  @Column('int', { name: 'num_tests_expiring_within_30', nullable: true })
  numTestsExpiringWithin_30: number | null;

  @Column('int', { name: 'num_tests_expiring_within_90', nullable: true })
  numTestsExpiringWithin_90: number | null;

  @Column('int', { name: 'user_id' })
  userId: number;

  @OneToMany(
    () => ShipmentDetailsPtToSite,
    (factTblShipmentDetailsPtToSite) => factTblShipmentDetailsPtToSite.shipment
  )
  factTblShipmentDetailsPtToSites: ShipmentDetailsPtToSite[];

  @ManyToOne(
    () => ProvincesTerritoriesRegions,
    (dimTblProvincesTerritoriesRegions) =>
      dimTblProvincesTerritoriesRegions.factTblShipmentPtToSiteMetadata
  )
  @JoinColumn([{ name: 'pt_id', referencedColumnName: 'ptId' }])
  pt: ProvincesTerritoriesRegions;
}
