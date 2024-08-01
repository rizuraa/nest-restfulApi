import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BorrowResponseDto, ReturnBookDto,} from './borrow.dto';

@Injectable()
export class BorrowService {
  constructor(private prisma: PrismaService) {}

  async borrowBook(memberId: number, bookId: number): Promise<BorrowResponseDto> {
    const member = await this.prisma.member.findUnique({
      where: { id: memberId },
    });
  
    if (!member) {
      throw new BadRequestException('Member not found');
    }
  
    if (member.isPenalized) {
      throw new BadRequestException('Member is currently penalized');
    }
  
    const borrowedBooksCount = await this.prisma.borrowedBook.count({
      where: { memberId, isReturned: false },
    });
  
    if (borrowedBooksCount >= 2) {
      throw new BadRequestException('Member may not borrow more than 2 books');
    }
  
    const isBookBorrowed = await this.prisma.borrowedBook.findFirst({
      where: { bookId, isReturned: false },
    });
  
    if (isBookBorrowed) {
      throw new BadRequestException('Book is already borrowed by another member');
    }
  
    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
    });
  
    if (!book) {
      throw new BadRequestException('Book not found');
    }
  
    if (book.quantity <= 0) {
      throw new BadRequestException('Book is out of stock');
    }
  
    // Check if there is a previously returned record
    const previousBorrowedBook = await this.prisma.borrowedBook.findFirst({
      where: { memberId, bookId, isReturned: true },
    });
  
    let borrowedBook;
    if (previousBorrowedBook) {
      borrowedBook = await this.prisma.borrowedBook.update({
        where: { id: previousBorrowedBook.id },
        data: {
          borrowedDate: new Date(),
          isReturned: false,
          returnDate: null,
        },
      });
    } else {
      borrowedBook = await this.prisma.borrowedBook.create({
        data: {
          memberId,
          bookId,
          borrowedDate: new Date(),
        },
      });
    }
  
    await this.prisma.book.update({
      where: { id: bookId },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
  
    return {
      kodemember: member.code,
      kodebuku: book.code,
      borrowDate: borrowedBook.borrowedDate,      
    };
  }

  async returnBook(returnBookDto: ReturnBookDto): Promise<BorrowResponseDto>{
    const { memberId, bookId } = returnBookDto;

    const borrowedBook = await this.prisma.borrowedBook.findFirst({
      where: {
        memberId,
        bookId,
        isReturned: false,
      },
      include: {
        member: true,
        book: true,
      },
    });
  
    if (!borrowedBook) {
      throw new BadRequestException('This book was not borrowed by the member or already returned');
    }
  
    const now = new Date();
    const borrowedDate = borrowedBook.borrowedDate;
    const diffTime = Math.abs(now.getTime() - borrowedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    let isPenalized = false;
    if (diffDays > 7) {
      isPenalized = true;
      await this.prisma.member.update({
        where: { id: memberId },
        data: { isPenalized: true },
      });
  
      setTimeout(async () => {
        await this.prisma.member.update({
          where: { id: memberId },
          data: { isPenalized: false },
        });
      }, 3 * 24 * 60 * 60 * 1000); // 3 days in milliseconds
    }
  
    await this.prisma.borrowedBook.update({
      where: { id: borrowedBook.id },
      data: {
        isReturned: true,
        returnDate: now,
      },
    });
  
    await this.prisma.book.update({
      where: { id: bookId },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
  
    return {
      kodemember: borrowedBook.member.code,
      kodebuku: borrowedBook.book.code,
      borrowDate: borrowedBook.borrowedDate,
      returnDate: now,
    };
  }
}
