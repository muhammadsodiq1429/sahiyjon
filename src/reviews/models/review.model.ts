import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Discount } from "../../discount/models/discount.model";
import { User } from "../../users/models/user.model";

interface ICreationReviewAttr {
  discount_id: number;
  user_id: number;
  comment: string;
  rating: "1" | "2" | "3" | "4" | "5";
}

@Table({ tableName: "review" })
export class Review extends Model<Review, ICreationReviewAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ForeignKey(() => Discount)
  @Column({ type: DataType.INTEGER })
  declare discount_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  declare user_id: number;

  @Column({ type: DataType.STRING })
  declare comment: string;

  @Column({ type: DataType.ENUM("1", "2", "3", "4", "5") })
  declare rating: "1" | "2" | "3" | "4" | "5";

  @BelongsTo(() => Discount)
  discount: Discount;

  @BelongsTo(() => User)
  user: User;
}
