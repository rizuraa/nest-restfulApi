import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowDto, BorrowResponseDto, ReturnBookDto } from './borrow.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Borrow Books')
@Controller('api/borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Borrow a book',
    type: BorrowResponseDto
  })
  async borrowBook(@Body() borrowDto: BorrowDto): Promise<BorrowResponseDto> {
    const { memberId, bookId } = borrowDto;

    if (!memberId || !bookId) {
      throw new BadRequestException('MemberId and BookId are required');
    }

    return this.borrowService.borrowBook(memberId, bookId);
  }

  @Post('/return_book')
  @ApiResponse({
    status: 200,
    description: 'Return a book',
    type: BorrowResponseDto,
  })
  async ReturnBookDto(@Body() returnBookDto: ReturnBookDto): Promise<BorrowResponseDto> {
    const { memberId, bookId } = returnBookDto;

    if (!memberId || !bookId) {
      throw new BadRequestException('MemberId and BookId are required');
    }

    return this.borrowService.returnBook(returnBookDto)
  }
}