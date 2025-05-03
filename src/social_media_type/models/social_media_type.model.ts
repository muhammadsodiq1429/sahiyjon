import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICreationSocialMediaTypeAttr {
  based_url: string;
  is_active: boolean;
}

@Table({ tableName: "social_media_type" })
export class SocialMediaType extends Model<
  SocialMediaType,
  ICreationSocialMediaTypeAttr
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare based_url: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;
}
