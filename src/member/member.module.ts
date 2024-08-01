import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MemberService } from './member.service';

@Module({
  imports: [PrismaModule],
  providers: [MemberService],
  controllers: [MemberController]
})
export class MemberModule {}
