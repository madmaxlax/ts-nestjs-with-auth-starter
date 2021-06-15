import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { TblUserTypes } from './TblUserTypes';

@Index('fkIdx_84', ['userTypeId'], {})
@Index('PK_tbl_user', ['userId'], { unique: true })
@Entity('tbl_users', { schema: 'dbo', synchronize: true })
export class TblUsers {
  @Column('uniqueidentifier', { primary: true, name: 'user_id', default: () => 'NewID()' })
  userId: string;

  @Column('uniqueidentifier', { name: 'user_type_id' })
  userTypeId: string;

  @Column('datetime', { name: 'created' })
  created: Date;

  @Column('datetime', { name: 'modified' })
  modified: Date;

  @Column('nvarchar', { name: 'user_azure_id', length: 100 })
  userAzureId: string;

  @ManyToOne(() => TblUserTypes, (tblUserTypes) => tblUserTypes.tblUsers)
  @JoinColumn([{ name: 'user_type_id', referencedColumnName: 'userTypeId' }])
  userType: TblUserTypes;
}
