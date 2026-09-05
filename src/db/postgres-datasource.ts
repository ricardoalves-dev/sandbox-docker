import { loadEnvFile } from "node:process";
import { DataSource } from "typeorm";

loadEnvFile();

export const pgDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 5432,
  username: process.env.POSTGRES_USER ?? 'user',
  password: process.env.POSTGRES_PASSWORD ?? '',
  database: process.env.POSTGRES_DB ?? 'test',
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});