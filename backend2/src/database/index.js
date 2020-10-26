import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Confeitaria from '../models/Confeitaria';
import Cliente from '../models/Cliente';
import Ingrediente from '../models/Ingrediente';
import Produto from '../models/Produto';
import IngredienteProduto from '../models/IngredienteProduto';

const models = [Confeitaria, Cliente, Ingrediente, Produto, IngredienteProduto];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => {
  if (model.associate) model.associate(connection.models);
});
