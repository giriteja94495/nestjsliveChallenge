import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { Transactions } from 'src/transactions/entities/transaction.entity';

config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [Transactions],
  entities: [Transactions],
  logging: true,
  synchronize: false,
};
const datasource = new DataSource(dataSourceOptions);

export default datasource;
