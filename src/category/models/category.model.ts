import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

interface ICreationCategoryAttr {
  name: string;
  description: string;
  parent_id: number;
}

@Table({ tableName: "category" })
export class Category extends Model<Category, ICreationCategoryAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare description: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  declare parent_id: number;
}
