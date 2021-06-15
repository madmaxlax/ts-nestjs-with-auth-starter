import { Column, Entity, Index, OneToMany } from 'typeorm';
import { TblUsers } from './TblUsers';

@Index('PK_tbl_user_types', ['userTypeId'], { unique: true })
@Entity('tbl_user_types', { schema: 'dbo' })
export class TblUserTypes {
  @Column('uniqueidentifier', { primary: true, name: 'user_type_id', default: () => 'NewID()' })
  userTypeId: string;

  @Column('nvarchar', { name: 'user_type_name', length: 50 })
  userTypeName: string;

  @OneToMany(() => TblUsers, (tblUsers) => tblUsers.userType)
  tblUsers: TblUsers[];
}
