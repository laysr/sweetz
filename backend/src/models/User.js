import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

import appConfig from '../config/appConfig';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já cadastrado',
        },
        validate: {
          isEmail: {
            msg: 'Email Inválido',
          },
        },
      },
      senha_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      senha: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'A senha deve ter entre 6 e 50 caracteres',
          },
        },
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
      lucro_desejado: {
        type: Sequelize.FLOAT,
        defaultValue: 0.5,
      },
      logo: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      logo_url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('logo')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'users',
    });

    this.addHook('beforeSave', async (cliente) => {
      if (cliente.senha) {
        cliente.senha_hash = await bcryptjs.hash(cliente.senha, 10);
      }
    });
    return this;
  }

  validacaoSenha(senha) {
    return bcryptjs.compare(senha, this.senha_hash);
  }
}
