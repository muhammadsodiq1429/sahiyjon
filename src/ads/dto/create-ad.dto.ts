import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateAdDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @IsString()
  @IsNotEmpty()
  target_url: string;

  @IsString()
  @IsNotEmpty()
  placement: string;

  @IsString()
  @IsNotEmpty()
  status: "draft" | "pending" | "active" | "paused" | "expired" | "rejected";

  @IsNotEmpty()
  @IsNumber()
  view_count: number;
}
