import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBRINIndex1735572003287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `CREATE INDEX brin_index_timestamp ON balance_history USING BRIN (timestamp)`,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`DROP INDEX brin_index_timestamp`);
  }
}
