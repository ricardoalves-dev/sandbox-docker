import "reflect-metadata";
import express from 'express';
import { uptime } from 'node:process';

const app = express();
const port = 3000;

// Types
const HttpStatus = {
  OK: 200,
} as const;

// Middlewares
app.use(express.json());

// Routes
app.get('/health', (_req, res, _next) => {
  res.status(HttpStatus.OK).send({
    status: 'OK',
    uptimeInSeconds: Math.floor(uptime()),
    currentTime: new Date().toLocaleString(),
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error(`An error occurred: ${err}`);
    process.exit(1);
  }

  console.log(`Server is running on port ${port}`);
});