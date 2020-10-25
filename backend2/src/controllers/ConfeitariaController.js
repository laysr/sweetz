import Confeitaria from '../models/Confeitarias';

class ConfeitariaController {
  // Listagem de confeitarias
  async index(req, res) {
    try {
      const confeitarias = await Confeitaria.findAll({
        attributes: [
          'id',
          'email',
          'nome',
          'cpf',
          'nome_confeitaria',
          'cnpj',
          'telefone',
          'rua',
          'numero',
          'complemento',
          'bairro',
          'cidade',
          'estado',
        ],
      });
      return res.status(200).json(confeitarias);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error });
    }
  }

  // Mostra um confeitaria
  async show(req, res) {
    try {
      const { userId } = req;
      const { id } = req.params;

      let pk = id;
      if (req.confeitaria) {
        pk = userId;
      }

      const confeitaria = await Confeitaria.findByPk(pk, {
        attributes: [
          'id',
          'email',
          'nome',
          'cpf',
          'nome_confeitaria',
          'cnpj',
          'telefone',
          'rua',
          'numero',
          'complemento',
          'bairro',
          'cidade',
          'estado',
        ],
      });
      return res.status(200).json(confeitaria);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  // Cadastro de Clientes
  async create(req, res) {
    try {
      const novoCliente = await Confeitaria.create(req.body);
      const {
        id,
        email,
        nome,
        cpf,
        // eslint-disable-next-line camelcase
        nome_confeitaria,
        cnpj,
        telefone,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
      } = novoCliente;

      return res.json({
        id,
        email,
        nome,
        cpf,
        nome_confeitaria,
        cnpj,
        telefone,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  // Atualização de um confeitaria
  async update(req, res) {
    try {
      const { userId } = req;

      if (!userId) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const confeitaria = await Confeitaria.findByPk(userId);

      if (!confeitaria) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novosDados = await confeitaria.update(req.body);

      return res.status(200).json(novosDados);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  // Apaga um confeitaria
  async delete(req, res) {
    try {
      const { userId } = req;

      if (!userId) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const confeitaria = await Confeitaria.findByPk(userId);

      if (!confeitaria) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      await confeitaria.destroy();

      return res.status(200).json({ message: 'Usuário apagado com sucesso!' });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }
}

export default new ConfeitariaController();
