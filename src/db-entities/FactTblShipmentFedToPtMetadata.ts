import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ShipmentDetailsFedToPt } from './FactTblShipmentDetailsFedToPt';
import { ProvincesTerritoriesRegions } from './DimTblProvincesTerritoriesRegions';

@Index('fkIdx_111_clone', ['ptId'], {})
@Index('PK_fact_tbl_shipment_metadata_clone', ['shipmentId'], { unique: true })
@Entity('fact_tbl_shipment_fed_to_pt_metadata', {
  schema: 'api',
  synchronize: true,
})
export class ShipmentFedToPtMetadata {
  @Column('uniqueidentifier', { primary: true, name: 'shipment_id', default: () => 'NewID()' })
  shipmentId: string;

  @Column('date', { name: 'shipment_date' })
  shipmentDate: Date;

  @Column('uniqueidentifier', { name: 'pt_id' })
  ptId: string;

  @Column('uniqueidentifier', { name: 'user_id', nullable: true })
  userId: string | null;

  @OneToMany(
    () => ShipmentDetailsFedToPt,
    (factTblShipmentDetailsFedToPt) => factTblShipmentDetailsFedToPt.shipment
  )
  factTblShipmentDetailsFedToPts: ShipmentDetailsFedToPt[];

  @ManyToOne(
    () => ProvincesTerritoriesRegions,
    (dimTblProvincesTerritoriesRegions) =>
      dimTblProvincesTerritoriesRegions.factTblShipmentFedToPtMetadata
  )
  @JoinColumn([{ name: 'pt_id', referencedColumnName: 'ptId' }])
  pt: ProvincesTerritoriesRegions;
}
