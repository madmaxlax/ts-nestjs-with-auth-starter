import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ProvincesTerritoriesRegions } from './DimTblProvincesTerritoriesRegions';
import { TestTypes } from './DimTblTestTypes';
import { ShipmentFedToPtMetadata } from './FactTblShipmentFedToPtMetadata';

@Index('fkIdx_122', ['shipmentId'], {})
@Index('fkIdx_50', ['ptId'], {})
@Index('fkIdx_60', ['testTypeId'], {})
@Index('PK_tbl_shipments', ['shipmentDetailsId'], { unique: true })
@Entity('fact_tbl_shipment_details_fed_to_pt', {
  schema: 'api',
  synchronize: true,
})
export class ShipmentDetailsFedToPt {
  @Column('uniqueidentifier', {
    primary: true,
    name: 'shipment_details_id',
    default: () => 'NewID()',
  })
  shipmentDetailsId: string;

  @Column('bigint', { name: 'shipment_quantity' })
  shipmentQuantity: string;

  @Column('uniqueidentifier', { name: 'pt_id' })
  ptId: string;

  @Column('uniqueidentifier', { name: 'test_type_id' })
  testTypeId: string;

  @Column('datetime', { name: 'modified' })
  modified: Date;

  @Column('datetime', { name: 'created' })
  created: Date;

  @Column('uniqueidentifier', { name: 'shipment_id' })
  shipmentId: string;

  @Column('nvarchar', { name: 'batch_no', nullable: true, length: 250 })
  batchNo: string | null;

  @Column('date', { name: 'exp_date', nullable: true })
  expDate: Date | null;

  @ManyToOne(
    () => ProvincesTerritoriesRegions,
    (dimTblProvincesTerritoriesRegions) =>
      dimTblProvincesTerritoriesRegions.factTblShipmentDetailsFedToPts
  )
  @JoinColumn([{ name: 'pt_id', referencedColumnName: 'ptId' }])
  pt: ProvincesTerritoriesRegions;

  @ManyToOne(() => TestTypes, (dimTblTestTypes) => dimTblTestTypes.factTblShipmentDetailsFedToPts)
  @JoinColumn([{ name: 'test_type_id', referencedColumnName: 'testTypeId' }])
  testType: TestTypes;

  @ManyToOne(
    () => ShipmentFedToPtMetadata,
    (factTblShipmentFedToPtMetadata) =>
      factTblShipmentFedToPtMetadata.factTblShipmentDetailsFedToPts
  )
  @JoinColumn([{ name: 'shipment_id', referencedColumnName: 'shipmentId' }])
  shipment: ShipmentFedToPtMetadata;
}
