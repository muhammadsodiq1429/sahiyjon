import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  owner_id: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  region_id: number;

  @IsNotEmpty()
  @IsNumber()
  district_id: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  status_id: number;

  @IsNotEmpty()
  @IsString()
  open_time: string;

  @IsNotEmpty()
  @IsString()
  close_time: string;
}
