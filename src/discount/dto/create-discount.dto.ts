import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateDiscountDto {
  @IsNumber()
  @IsNotEmpty()
  store_id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsDecimal()
  @IsNotEmpty()
  discount_percent: number;

  @IsDateString()
  @IsNotEmpty()
  start_date: Date;

  @IsDateString()
  @IsNotEmpty()
  end_date: Date;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @IsDecimal()
  @IsOptional()
  discount_value: number;

  @IsString()
  @IsNotEmpty()
  special_link: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsNumber()
  @IsNotEmpty()
  type_id: number;
}
