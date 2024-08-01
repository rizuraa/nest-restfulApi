import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookService } from './book.service';

@Module({
  imports: [PrismaModule],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
