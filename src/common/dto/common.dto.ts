import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PreSignedUrlDto {
  @ApiProperty()
  @IsNotEmpty()
  key: string;
}
