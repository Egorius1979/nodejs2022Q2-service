import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const migrat = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['db/migration/*.ts'],
  synchronize: false,
} as DataSourceOptions);

migrat.initialize();
