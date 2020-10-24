import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Confeitaria from '../models/Confeitaria';

const models = [Confeitaria];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
