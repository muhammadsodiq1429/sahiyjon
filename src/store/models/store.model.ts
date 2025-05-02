import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Region } from "../../region/models/region.model";
import { District } from "../../district/models/district.model";
import { Status } from "../../status/models/status.model";

interface ICreationStoreAttr {
  name: string;
  location: string;
  phone: string;
  owner_id: number;
  description: string;
  region_id: number;
  district_id: number;
  address: string;
  status_id: number;
  open_time: string;
  close_time: string;
}

@Table({ tableName: "stores" })
export class Store extends Model<Store, ICreationStoreAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare location: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare phone: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare owner_id: number;

  @Column({ type: DataType.TEXT })
  declare description: string;

  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare region_id: number;

  @ForeignKey(() => District)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare district_id: number;

  @Column({ type: DataType.STRING })
  declare address: string;

  @ForeignKey(() => Status)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare status_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare open_time: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare close_time: string;
}
