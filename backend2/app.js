import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './src/database';

import express from 'express';

import homeRoutes from './src/routes/homeRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import confeitariaRoutes from './src/routes/confeitariaRoutes';
import clienteRoutes from './src/routes/clienteRoutes';
import ingredienteRoutes from './src/routes/ingredienteRoutes';
import produtoRoutes from './src/routes/produtoRoutes';
import ingredienteProdutoRoutes from './src/routes/ingredienteProdutoRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/login/', tokenRoutes);
    this.app.use('/confeitarias/', confeitariaRoutes);
    this.app.use('/clientes/', clienteRoutes);
    this.app.use('/ingredientes/', ingredienteRoutes);
    this.app.use('/produtos/', produtoRoutes);
    this.app.use('/ingredientes-produtos/', ingredienteProdutoRoutes);
  }
}

export default new App().app;
