import { ApiProperty } from "@nestjs/swagger";

export class BorrowedBookDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    code: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    borrowedDate: Date;
  }
  
  export class MemberWithBorrowedBooksDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    code: string;

    @ApiProperty()
    name: string;    

    @ApiProperty()
    borrowedBooks: BorrowedBookDto[];
  }
  