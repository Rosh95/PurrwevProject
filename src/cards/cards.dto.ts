import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ example: 'Card Title', description: 'The title of the card' })
  title: string;

  @ApiProperty({
    example: 'Card Description',
    description: 'The description of the card',
  })
  description: string;

  @ApiProperty({ example: 1, description: 'The ID of the column' })
  columnId: number;
}
