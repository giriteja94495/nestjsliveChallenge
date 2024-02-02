import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Transactions } from './entities/transaction.entity';
import { CUSTOM_QUERIES } from './custom-queries';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private readonly transactionRepository: Repository<Transactions>,
  ) {}

  async findAll(): Promise<Transactions[]> {
    return this.transactionRepository.find();
  }

  async findCountOfRecords(): Promise<number>{
    return await this.transactionRepository.query('Select count(*) from transactions');
  }

  async findById(transactionID: number): Promise<Transactions> {
    const options: FindOneOptions<Transactions> = {
      where: { transactionid: transactionID },
    };
    return this.transactionRepository.findOne(options);
  }

  

  async findByUser(userId: string): Promise<Transactions[]> {
    const options: FindOneOptions<Transactions> = {
      where: { userid: userId },
    };
    return this.transactionRepository.find(options);
  }

  async findByUserTotal(userId: string): Promise<number> {
    const transactions = await this.findByUser(userId);
    return transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );
  }


  async findAverageOfAllTransactions(): Promise<number>{
    return  await this.transactionRepository.query(CUSTOM_QUERIES.FIND_AVG).then(res=> {
      console.log("average is "+ JSON.stringify(res))
      return res[0].avg;
    });
  }

  async findAllTransactionsBasedOnDate(startDate: string, endDate: string): Promise<Transactions[]>{
    const transactions =  await this.transactionRepository.query(`select * from transactions where timestamp between '${startDate}' and '${endDate}'`);
    return transactions
  }

  async findTheLoyaltyScoreForUser(userId: string): Promise<number>{
    const avgOfAllTransactions = await this.findAverageOfAllTransactions();
    const totalTransactionsByAUser =  await this.transactionRepository.query(`select sum(amount) from transactions where userid='${userId}' group by userid`).then(res=>{
      console.log(res);
      return res[0].sum;
    });
    const usersTotal =  await this.findByUserTotal(userId); 
    return totalTransactionsByAUser/avgOfAllTransactions * 100 ;

  }

  async findPotentialUsers(timestamp: string): Promise<Transactions[]>{

    const userIdMapToLastMonthData = this.transactionRepository.query(`select `)

    // TODO 
    return null;
  }


  async getTopNusersForAParticularMonth(startDate: string, endDate: string, N: number | 10 ): Promise<any[]>{
   return  await this.transactionRepository.query(`select * from (select userid, sum(amount) as total from (select * from transactions where timestamp between '${startDate}' and '${endDate}') as dummy group by userid) db1 order by total desc limit ${N}`);
  }
}
