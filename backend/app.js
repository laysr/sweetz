import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './src/database';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './src/routes/homeRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import userRoutes from './src/routes/userRoutes';
import ingredienteRoutes from './src/routes/ingredienteRoutes';
import produtoRoutes from './src/routes/produtoRoutes';
import ingredienteProdutoRoutes from './src/routes/ingredienteProdutoRoutes';

const whiteList = [
  'https://sweetz.anakena.com.br',
  'http://sweetz.anakena.com.br',
  'http://localhost:3333',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/login/', tokenRoutes);
    this.app.use('/user/', userRoutes);
    this.app.use('/ingredientes/', ingredienteRoutes);
    this.app.use('/produtos/', produtoRoutes);
    this.app.use('/ingredientes-produtos/', ingredienteProdutoRoutes);
  }
}

export default new App().app;
