import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Confeitaria from '../models/Confeitarias';
import Cliente from '../models/Cliente';

const models = [Confeitaria, Cliente];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
