import { PartialType } from '@nestjs/swagger';
import { CreateSocialMediaTypeDto } from './create-social_media_type.dto';

export class UpdateSocialMediaTypeDto extends PartialType(CreateSocialMediaTypeDto) {}
