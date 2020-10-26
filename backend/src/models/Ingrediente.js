import Sequelize, { Model } from 'sequelize';

export default class Ingrediente extends Model {
  static init(sequelize) {
    super.init({
      confeitaria_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      quantidade: {
        type: Sequelize.INTEGER,
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
      preco: {
        type: Sequelize.FLOAT,
        defaultValue: '',
      },
    }, {
      sequelize,
      tableName: 'ingredientes',
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Confeitaria, { foreignKey: 'confeitaria_id' });
    this.hasMany(models.IngredienteProduto, { as: 'ingredienteProduto' });
  }
}
