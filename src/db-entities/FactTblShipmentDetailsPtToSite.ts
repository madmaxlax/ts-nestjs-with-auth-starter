import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { TestTypes } from './DimTblTestTypes';
import { ShipmentPtToSiteMetadata } from './FactTblShipmentPtToSiteMetadata';
import { SitesUseCase } from './DimTblSitesUseCase';

@Index('fkIdx_106', ['shipmentId'], {})
@Index('fkIdx_60_clone', ['testTypeId'], {})
@Index('fkIdx_94', ['siteUseCaseId'], {})
@Index('PK_tbl_shipments_clone', ['shipmentDetailsId'], { unique: true })
@Entity('fact_tbl_shipment_details_pt_to_site', {
  schema: 'api',
  synchronize: true,
})
export class ShipmentDetailsPtToSite {
  @Column('uniqueidentifier', {
    primary: true,
    name: 'shipment_details_id',
    default: () => 'NewID()',
  })
  shipmentDetailsId: string;

  @Column('bigint', { name: 'shipment_quantity' })
  shipmentQuantity: string;

  @Column('date', { name: 'shipment_expiration', nullable: true })
  shipmentExpiration: Date | null;

  @Column('nvarchar', {
    name: 'shipment_batch_number',
    nullable: true,
    length: 50,
  })
  shipmentBatchNumber: string | null;

  @Column('uniqueidentifier', { name: 'test_type_id' })
  testTypeId: string;

  @Column('datetime', { name: 'modified' })
  modified: Date;

  @Column('datetime', { name: 'created' })
  created: Date;

  @Column('uniqueidentifier', { name: 'site_use_case_id' })
  siteUseCaseId: string;

  @Column('int', { name: 'number_of_sites', nullable: true })
  numberOfSites: number | null;

  @Column('uniqueidentifier', { name: 'shipment_id' })
  shipmentId: string;

  @Column('int', { name: 'unused_tests' })
  unusedTests: number;

  @ManyToOne(() => TestTypes, (dimTblTestTypes) => dimTblTestTypes.factTblShipmentDetailsPtToSites)
  @JoinColumn([{ name: 'test_type_id', referencedColumnName: 'testTypeId' }])
  testType: TestTypes;

  @ManyToOne(
    () => ShipmentPtToSiteMetadata,
    (factTblShipmentPtToSiteMetadata) =>
      factTblShipmentPtToSiteMetadata.factTblShipmentDetailsPtToSites
  )
  @JoinColumn([{ name: 'shipment_id', referencedColumnName: 'shipmentId' }])
  shipment: ShipmentPtToSiteMetadata;

  @ManyToOne(
    () => SitesUseCase,
    (dimTblSitesUseCase) => dimTblSitesUseCase.factTblShipmentDetailsPtToSites
  )
  @JoinColumn([{ name: 'site_use_case_id', referencedColumnName: 'siteUseCaseId' }])
  siteUseCase: SitesUseCase;
}
