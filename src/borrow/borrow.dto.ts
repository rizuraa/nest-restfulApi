import { ApiProperty } from "@nestjs/swagger";

export class BorrowDto {
    @ApiProperty()
    memberId: number;

    @ApiProperty()
    bookId: number;
}

export class BorrowResponseDto {
    @ApiProperty()
    kodemember: string;

    @ApiProperty()
    kodebuku: string;

    @ApiProperty()
    borrowDate: Date;      

    @ApiProperty()
    returnDate?: Date;
}

export class ReturnBookDto {
    @ApiProperty()
    memberId: number;

    @ApiProperty()
    bookId: number;
}