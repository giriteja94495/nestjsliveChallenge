import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transactions } from './entities/transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(): Promise<Transactions[]> {
    return this.transactionsService.findAll();
  }

  @Get('avg-trans-amt')
   async  avgTransactionAmount(): Promise<number>{
    return this.transactionsService.findAverageOfAllTransactions()
  }

  @Get('count')
  async count(): Promise<number>{
    return await this.transactionsService.findCountOfRecords();
  }

  @Post('all-trans')
  async getAllTransactionsOnAParticularDate(@Body('timestamp')timestamp: string): Promise<Transactions[]>{
    const askedDate = new Date(timestamp);
    askedDate.setDate(askedDate.getDate() - 1);
    const startDate = askedDate.toISOString().split('T')[0]+' 23:59:59';
    const endDate = timestamp + ' 23:59:59';

    return  await this.transactionsService.findAllTransactionsBasedOnDate(startDate, endDate);
  }


  @Get('top-users')
  async getTopNusers(@Body('timestamp')timestamp: string): Promise<any[]>{
    const askedDate = new Date(timestamp);
    askedDate.setDate(askedDate.getDate() - 30);
    const startDate = askedDate.toISOString().split('T')[0]+' 23:59:59';
    const endDate = timestamp + ' 23:59:59';
    return await this.transactionsService.getTopNusersForAParticularMonth(startDate, endDate, 10);
  }

  @Get('loyalty-score/:id')
  async getALoyaltyScore(@Param('id') userId:string): Promise<any>{
    return await this.transactionsService.findTheLoyaltyScoreForUser(userId);
  }

  @Post('potential-users')
  async getAllPotentialUserse(@Body('timestamp')timestamp: string):Promise<Transactions>{
   // return await this.transactionsService.findPotentialUsers(timestamp);
   // TODO
   return null;
  }

}
