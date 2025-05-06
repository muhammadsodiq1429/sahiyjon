import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICreationAdAttr {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  target_url: string;
  placement: string;
  status: "draft" | "pending" | "active" | "paused" | "expired" | "rejected";
  view_count: number;
}

@Table({ tableName: "ads" })
export class Ad extends Model<Ad, ICreationAdAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.STRING })
  declare description: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare start_date: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  declare end_date: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  declare target_url: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare placement: string;

  @Column({
    type: DataType.ENUM(
      "draft", 
      "pending",
      "active",
      "paused",
      "expired",
      "rejected"
    ),
    allowNull: false,
  })
  declare status:
    | "draft"
    | "pending"
    | "active"
    | "paused"
    | "expired"
    | "rejected";

  @Column({ type: DataType.INTEGER })
  declare view_count: number;
}
