import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['transactionid'])
export class Transactions {
  @PrimaryGeneratedColumn()
  transactionid: number;

  @Column({ type: 'varchar', nullable: true })
  userid: string | null;

  @Column('numeric', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
