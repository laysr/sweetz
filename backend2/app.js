import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import express from 'express';

import homeRoutes from './src/routes/homeRoutes';
import confeitariaRoutes from './src/routes/confeitariaRoutes';
import clienteRoutes from './src/routes/clienteRoutes';
import tokenRoutes from './src/routes/tokenRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/confeitarias/', confeitariaRoutes);
    this.app.use('/clientes/', clienteRoutes);
    this.app.use('/login/', tokenRoutes);
  }
}

export default new App().app;
