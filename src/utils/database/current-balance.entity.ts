import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('current_balances')
export class CurrentBalance {
  @PrimaryColumn({ type: 'varchar', length: 42 })
  address: string;

  @Column({ type: 'numeric' })
  balance: number;

  @Column({ type: 'timestamptz' })
  lastUpdated: Date;
}
