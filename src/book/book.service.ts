import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { BookDto } from "./book.dto";

@Injectable()
export class BookService {
    constructor (private prisma: PrismaService){}

    async getAllBooks(): Promise<BookDto[]>{
        const books = await this.prisma.book.findMany({
            where: {
              quantity: {
                gt: 0, // only get books with stock greater than 0
              },
            },
          });
      
          return books.map(book => ({
            id: book.id,
            code: book.code,
            title: book.title,
            author: book.author,
            quantity: book.quantity,
          }));
    }
}