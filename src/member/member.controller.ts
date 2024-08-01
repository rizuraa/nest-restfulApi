import { Controller, Get, HttpCode } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberWithBorrowedBooksDto } from './member.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Members')
@Controller('api/member')
export class MemberController {
    constructor (private memberService: MemberService){}

    @Get()    
    @ApiResponse({
        status: 200,
        description: 'Get Members that borrowing books',
        type: [MemberWithBorrowedBooksDto]
    })
    async getAllMembers(): Promise<MemberWithBorrowedBooksDto[]>{
        return this.memberService.getAllMembers();
    }
}
