import Sequelize, { Model } from 'sequelize';

import appConfig from '../config/appConfig';

export default class Produto extends Model {
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
      descricao: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      preco: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      custo: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      preco_sugerido: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      image: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      imagem_url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('image')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'produtos',
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Confeitaria, { foreignKey: 'confeitaria_id' });
    this.hasMany(models.IngredienteProduto, { as: 'ingredientes' });
  }
}
