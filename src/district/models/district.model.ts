import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Region } from "../../region/models/region.model";

interface ICreationDistrictAttr {
  name: string;
  region_id: number;
}

@Table({ tableName: "district" })
export class District extends Model<District, ICreationDistrictAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare name: string;

  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER })
  declare region_id: number;
}
