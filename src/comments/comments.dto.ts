import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  cardId: number;
}
