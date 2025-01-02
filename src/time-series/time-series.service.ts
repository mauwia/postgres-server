import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BalanceHistory, CurrentBalance } from 'src/utils';
import { Between, DataSource, Repository } from 'typeorm';

@Injectable()
export class TimeSeriesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(BalanceHistory)
    private readonly balanceHistory: Repository<BalanceHistory>,
  ) {}
  async updateBalance(address: string, newBalance: number): Promise<void> {
    const timestamp = new Date();

    // Start a transaction to ensure both updates are atomic
    await this.dataSource.transaction(async (manager) => {
      // Update or insert the current balance
      await manager
        .createQueryBuilder()
        .insert()
        .into(CurrentBalance)
        .values({ address, balance: newBalance, lastUpdated: timestamp })
        .orUpdate(['balance', 'lastUpdated'], ['address'])
        .execute();
    });
  }
  async getBalanceHistory(address: string, start: Date, end: Date) {
    return this.balanceHistory.find({
      where: { address, timestamp: Between(start, end) },
      order: { timestamp: 'ASC' },
    });
  }
}
