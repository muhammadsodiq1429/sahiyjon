import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICreationAdminAttr {
  fullname: string;
  username: string;
  email: string;
  hashed_passwrod: string;
  is_creator: boolean;
  is_active: boolean;
}

@Table({ tableName: "admins" })
export class Admin extends Model<Admin, ICreationAdminAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(60), allowNull: false })
  declare fullname: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare username: string;

  @Column({ type: DataType.STRING(70), allowNull: false, unique: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare hashed_password: string;

  @Column({ type: DataType.STRING, defaultValue: "" })
  declare hashed_refresh_token: string;

  @Column({ type: DataType.STRING, defaultValue: false })
  declare is_creator: boolean;

  @Column({ type: DataType.STRING, defaultValue: true })
  declare is_active: boolean;
}
