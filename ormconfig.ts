import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

export default {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/entity/*.entity.js'],
  synchronize: true,
  // retryAttempts: 10,
} as DataSourceOptions;
