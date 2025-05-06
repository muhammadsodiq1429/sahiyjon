import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IBotCreationAttr {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  lang: string;
}

@Table({ tableName: "bot" })
export class Bot extends Model<Bot, IBotCreationAttr> {
  @Column({ type: DataType.BIGINT, primaryKey: true })
  declare user_id: number;

  @Column({ type: DataType.STRING })
  declare username: string;

  @Column({ type: DataType.STRING })
  declare first_name: string;

  @Column({ type: DataType.STRING })
  declare last_name: string;

  @Column({ type: DataType.STRING })
  declare phone_number: string;

  @Column({ type: DataType.STRING })
  declare lang: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare status: boolean;
}
