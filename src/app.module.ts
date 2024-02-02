import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/datasource';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
