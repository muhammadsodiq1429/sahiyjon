import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICreationMediaAttr {
  file: string;
  name: string;
  table_name: string;
  table_id: number;
}

@Table({ tableName: "media" })
export class Media extends Model<Media, ICreationMediaAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare file: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare table_name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare table_id: number;
}
