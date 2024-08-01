import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  quantity: number;
}
