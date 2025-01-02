import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('balance_history')
export class BalanceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 42 })
  address: string;

  @Column({ type: 'numeric' })
  balance: number;

  @Column({ type: 'timestamptz' })
  timestamp: Date;
}
