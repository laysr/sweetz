import Cliente from '../models/Cliente';

class ClienteController {
  // Listagem de clientes
  async index(req, res) {
    try {
      const clientes = await Cliente.findAll({
        attributes: [
          'id',
          'email',
          'nome',
          'cpf',
          'telefone',
          'rua',
          'numero',
          'complemento',
          'referencia',
          'bairro',
          'cidade',
          'estado',
        ],
      });
      return res.status(200).json(clientes);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  // Mostra um cliente
  async show(req, res) {
    try {
      const { userId } = req;
      const cliente = await Cliente.findByPk(userId, {
        attributes: [
          'id',
          'email',
          'nome',
          'cpf',
          'telefone',
          'rua',
          'numero',
          'complemento',
          'referencia',
          'bairro',
          'cidade',
          'estado',
        ],
      });
      return res.status(200).json(cliente);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  // Cadastro de Clientes
  async create(req, res) {
    try {
      const novoCliente = await Cliente.create(req.body);
      const {
        id,
        email,
        nome,
        cpf,
        telefone,
        rua,
        numero,
        complemento,
        referencia,
        bairro,
        cidade,
        estado,
      } = novoCliente;

      return res.json({
        id,
        email,
        nome,
        cpf,
        telefone,
        rua,
        numero,
        complemento,
        referencia,
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

  // Atualização de um cliente
  async update(req, res) {
    try {
      const { userId } = req;

      if (!userId) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const cliente = await Cliente.findByPk(userId);

      if (!cliente) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novosDados = await cliente.update(req.body);

      const {
        id,
        email,
        nome,
        cpf,
        telefone,
        rua,
        numero,
        complemento,
        referencia,
        bairro,
        cidade,
        estado,
      } = novosDados;

      return res.status(200).json({
        id,
        email,
        nome,
        cpf,
        telefone,
        rua,
        numero,
        complemento,
        referencia,
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

  // Apaga um cliente
  async delete(req, res) {
    try {
      const { userId } = req;

      if (!userId) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const cliente = await Cliente.findByPk(userId);

      if (!cliente) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      await cliente.destroy();

      return res.status(200).json({ message: 'Usuário apagado com sucesso!' });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }
}

export default new ClienteController();
