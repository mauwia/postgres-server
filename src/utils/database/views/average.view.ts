import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  name: 'balance_avg_view', // Name of the view
  expression: `
    SELECT 
        address,
        AVG(balance) AS average_balance
    FROM 
        balance_history
    GROUP BY 
        address
  `,
})
export class BalanceAvgView {
  @ViewColumn()
  address: string;

  @ViewColumn()
  average_balance: number;
}
