import { Controller, Get, HttpCode } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from '@prisma/client';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookDto } from './book.dto';

@ApiTags('Books')
@Controller('api/book')
export class BookController {
    constructor(private bookService: BookService){}

    @Get()
    @ApiResponse({
      status: 200,
      description: 'Show all books',
      type: [BookDto]
    })
    async getAllBooks(): Promise<BookDto[]> {
      return this.bookService.getAllBooks()
    }
}
