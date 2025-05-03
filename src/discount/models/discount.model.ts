import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Store } from "../../store/models/store.model";
import { Category } from "../../category/models/category.model";
import { Type } from "../../type/models/type.model";

interface ICreationDiscountAttr {
  store_id: number;
  title: string;
  description: string;
  discount_percent: number;
  start_date: Date;
  end_date: Date;
  category_id: number;
  discount_value: number;
  special_link: string;
  is_active: boolean;
  type_id: number;
}

@Table({ tableName: "discounts" })
export class Discount extends Model<Discount, ICreationDiscountAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare store_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.TEXT })
  declare description: string;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  declare discount_percent: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare start_date: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  declare end_date: Date;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare category_id: number;

  @Column({ type: DataType.DECIMAL })
  declare discount_value: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare special_link: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @ForeignKey(() => Type)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare type_id: number;
}
