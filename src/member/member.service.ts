import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { Member } from "@prisma/client"
import { MemberWithBorrowedBooksDto } from "./member.dto"

@Injectable()
export class MemberService{
    constructor (private prisma: PrismaService){}

    async getAllMembers(): Promise<MemberWithBorrowedBooksDto[]>{
        const members = await this.prisma.member.findMany({
            include: {
              borrowebBooks: {
                where: { isReturned: false },
                include: {
                  book: true,
                },
              },
            },
          });
      
          return members.map(member => ({
            id: member.id,
            code: member.code,
            name: member.name,
            isPenalized: member.isPenalized,
            penaltyEndDate: member.penaltyEndDate,
            borrowedBooks: member.borrowebBooks.map(borrowedBook => ({
              id: borrowedBook.book.id,
              code: borrowedBook.book.code,
              title: borrowedBook.book.title,
              author: borrowedBook.book.author,
              borrowedDate: borrowedBook.borrowedDate,
            })),
          }));
        }
}