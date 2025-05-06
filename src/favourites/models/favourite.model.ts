import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Discount } from "../../discount/models/discount.model";

  interface ICreationFavouriteAttr {
    user_id: number;
    discount_id: number;
}

@Table({ tableName: "favourite" })
export class Favourite extends Model<Favourite, ICreationFavouriteAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_id: number;

  @ForeignKey(() => Discount)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare discount_id: number;

  @BelongsTo(() => Discount)
  discount: Discount;

  @BelongsTo(() => User)
  user: User;
}
