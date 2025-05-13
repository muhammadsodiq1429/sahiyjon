import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICarCreationAttr {
  brend: string;
  model: string;
  color: string;
  number: string;
  license_plate: string;
  year: Date;
}

@Table({ tableName: "cars" })
export class Car extends Model<Car, ICarCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare brend: string;

  @Column({ type: DataType.STRING })
  declare model: string;

  @Column({ type: DataType.STRING })
  declare color: string;

  @Column({ type: DataType.STRING })
  declare number: string;

  @Column({ type: DataType.STRING })
  declare license_plate: string;

  @Column({ type: DataType.DATEONLY })
  declare year: Date;

  @Column({ type: DataType.BIGINT })
  declare user_id: number;
}
