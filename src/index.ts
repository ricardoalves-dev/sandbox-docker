import "reflect-metadata";
import express from 'express';
import { pgDataSource } from "./db/postgres-datasource.js";
import { healthRouter } from "./routes/health-route.js";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use(healthRouter);

// Bootstrap
async function bootstrap() {
  try {
    const port = Number(process.env.API_PORT) ?? 0;
    const dbPort = Number(process.env.DB_PORT) ?? 0;

    await pgDataSource.initialize();
    console.log(`Database is connected on port: ${dbPort}`);

    await new Promise<void>((res, rej) => {
      app.listen(port, (err) => {
        if (err) rej(err);
        res();
      });
    });

    console.log(`Application in running on port: ${port}`);
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    if (pgDataSource.isInitialized) await pgDataSource.destroy();
    process.exit(1);
  }
}

bootstrap();

