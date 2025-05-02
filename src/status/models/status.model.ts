import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICreationStatusAttr {
  name: string;
  description: string;
}

@Table({ tableName: "status" })
export class Status extends Model<Status, ICreationStatusAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare description: string;
}
