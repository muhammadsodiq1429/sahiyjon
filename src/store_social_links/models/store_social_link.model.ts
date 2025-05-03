import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Store } from "../../store/models/store.model";
import { SocialMediaType } from "../../social_media_type/models/social_media_type.model";

interface ICreationStoreSocialLinkAttr {
  url: string;
  description: string;
  store_id: number;
  social_media_type_id: number;
}

@Table({
  tableName: "store_social_link",
})
export class StoreSocialLink extends Model<
  StoreSocialLink,
  ICreationStoreSocialLinkAttr
> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare url: string;

  @Column({ type: DataType.STRING })
  declare description: string;

  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare store_id: number;

  @ForeignKey(() => SocialMediaType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare social_media_type_id: number;

  @BelongsTo(() => Store)
  store: Store;

  @BelongsTo(() => SocialMediaType)
  social_media_type: SocialMediaType;
}
