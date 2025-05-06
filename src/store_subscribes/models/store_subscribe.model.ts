// export class StoreSubscribe {}

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Store } from "../../store/models/store.model";

interface ICreationStoreSubscribeAttr {
  user_id: number;
  store_id: number;
}

@Table({ tableName: "store_ubscribe" })
export class StoreSubscribe extends Model<
  StoreSubscribe,
  ICreationStoreSubscribeAttr
> {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_id: number;

  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare store_id: number;

  @BelongsTo(() => Store)
  store: Store;

  @BelongsTo(() => User)
  user: User;
}
