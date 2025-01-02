import { Injectable } from '@nestjs/common';
import { Wallet } from 'ethers';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class SeederService {
  constructor(private readonly dataSource: DataSource) {}
  async initRecord(): Promise<void> {
    const batchSize = 10000
    ; // Number of records per batch for efficiency
    const totalRecords = 10_000_0;
    const tableName = 'addresses'; // Replace with your actual table name

    console.log(`Starting seeding process for ${totalRecords} records...`);
    const tasks = [];
    for (let i = 0; i < totalRecords / batchSize; i++) {
      const records = [];

      for (let j = 0; j < batchSize; j++) {
        const address = this.generateRandomEthereumAddress();
        const productId = uuidv4().slice(0, 10); // Generate a random product ID with 10 characters

        records.push({ address, productId });
        // console.log(records.length)
      }
      tasks.push(this.insertBatch(records, 'addresses'));
      console.log(`Inserted batch ${i + 1} of ${totalRecords / batchSize}`);
    }
    await Promise.all(tasks);

    console.log('Seeding process completed.');
  }

  private generateRandomEthereumAddress(): string {
    return Wallet.createRandom().address;
  }

  private async insertBatch(
    records: { address: string; productId: string }[],
    tableName: string,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const values = records
        .map((record) => `('${record.address}', '${record.productId}')`)
        .join(',');

      const insertQuery = `INSERT INTO ${tableName} (address, "productId") VALUES ${values}`;
      await queryRunner.query(insertQuery);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error('Error during batch insert:', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
