import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { MemberModule } from './member/member.module';
import { BorrowModule } from './borrow/borrow.module';

@Module({
  imports: [PrismaModule, MemberModule, BookModule, BorrowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
