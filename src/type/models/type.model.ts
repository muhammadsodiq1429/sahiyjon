import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICreationTypeAttr {
  name: string;
  description: string;
}

@Table({ tableName: "types" })
export class Type extends Model<Type, ICreationTypeAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.TEXT })
  declare description: string;
}
