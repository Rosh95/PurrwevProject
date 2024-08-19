import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDto {
  @ApiProperty({
    example: 'Updated Card Title',
    description: 'The title of the card',
  })
  title: string;

  @ApiProperty({
    example: 'Updated Card Description',
    description: 'The description of the card',
  })
  description: string;
}
