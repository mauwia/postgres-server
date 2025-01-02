import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBalanceHistoryTrigger1735637067016
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    //         CREATE OR REPLACE FUNCTION insert_balance_history() 
    //         RETURNS TRIGGER AS $$
    //         BEGIN
    //             -- Insert the new balance into the history table
    //             INSERT INTO balance_history (address, balance, timestamp)
    //             VALUES (NEW.address, NEW.balance, NOW());
                
    //             -- Return the new value (required for update)
    //             RETURN NEW;
    //         END;
    //         $$ LANGUAGE plpgsql;
    //       `);

    // // Create the trigger
    // await queryRunner.query(`
    //         CREATE TRIGGER balance_update_trigger
    //         AFTER UPDATE ON current_balances
    //         FOR EACH ROW
    //         EXECUTE FUNCTION insert_balance_history();
    //       `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    //     DROP TRIGGER IF EXISTS balance_update_trigger ON current_balances;
    //   `);
    // await queryRunner.query(`
    //     DROP FUNCTION IF EXISTS insert_balance_history;
    //   `);
  }
}
