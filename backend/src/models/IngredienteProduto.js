import Sequelize, { Model } from 'sequelize';

export default class IngredienteProduto extends Model {
  static init(sequelize) {
    super.init({
      user_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      ingrediente_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      produto_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      quantidade: {
        type: Sequelize.FLOAT,
        defaultValue: '',
      },
      unidade: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 4],
            msg: 'Campo unidade deve ter entre 1 e 4 caracteres',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'ingredientes_produtos',
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Produto, { foreignKey: 'produto_id', as: 'produto' });
    this.belongsTo(models.Ingrediente, { foreignKey: 'ingrediente_id', as: 'ingrediente' });
  }
}
