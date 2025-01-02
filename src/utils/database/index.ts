import { DataSource } from 'typeorm';
import '../config';

const host = process.env.DB_HOST ?? 'localhost';
const port = parseInt(process.env.DB_PORT ?? '5432', 10);
const username = process.env.DB_USER ?? 'root';
const password = process.env.DB_PASSWORD;
const database = 'postgres';
console.log('host:', __dirname);
export const Database = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  synchronize: false,
  migrationsRun: true,
  logging: false,
  entities: ['**.entity.{js,ts}'],
  migrations: [__dirname + '/migration/*-*.{js,ts}'],
  subscribers: [],
});

export * from './current-balance.entity';
export * from './balance-history.entity';
export * from './article.entity';
export * from './views';
