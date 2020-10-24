import Sequelize, { Model } from 'sequelize';

export default class Confeitaria extends Model {
  static init(sequelize) {
    super.init({
      email: Sequelize.STRING,
      senha: Sequelize.STRING,
      nome: Sequelize.STRING,
      cpf: Sequelize.INTEGER,
      nome_confeitaria: Sequelize.STRING,
      cnpj: Sequelize.INTEGER,
      telefone: Sequelize.INTEGER,
      rua: Sequelize.STRING,
      numero: Sequelize.INTEGER,
      complemento: Sequelize.STRING,
      bairro: Sequelize.STRING,
      cidade: Sequelize.STRING,
      estado: Sequelize.STRING,
      logo_path: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }
}
