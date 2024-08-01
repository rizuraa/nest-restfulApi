import { Module } from '@nestjs/common';
import { BorrowController } from './borrow.controller';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BorrowService } from './borrow.service';

@Module({
  providers: [BorrowService],
  imports: [PrismaModule],
  controllers: [BorrowController]
})
export class BorrowModule {}
