import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import swaggerUi from 'swagger-ui-express';

import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';

import createConnection from './database';

import { documentation } from './utils/swagger';

createConnection();
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(documentation));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
