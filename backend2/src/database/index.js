import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Confeitaria from '../models/Confeitaria';
import Cliente from '../models/Cliente';
import Ingrediente from '../models/Ingrediente';
import Produto from '../models/Produto';

const models = [Confeitaria, Cliente, Ingrediente, Produto];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
