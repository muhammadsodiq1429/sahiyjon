import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICreationRegoinAttr {
  name: string;
}

@Table({ tableName: "region" })
export class Region extends Model<Region, ICreationRegoinAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  declare name: string;
}
