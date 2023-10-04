import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  password: process.env.DB_PASSWORD || 'postgres',
  username: process.env.DB_USERNAME || 'postgres',
  database: process.env.DB_DATABASE || 'goost',
  synchronize: false,
  logging: true,
  entities: ['src/typeorm/**/*.ts'],
  migrations: ['typeorm/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
});

export default AppDataSource;
