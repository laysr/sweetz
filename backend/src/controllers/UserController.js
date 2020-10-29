import User from '../models/User';

class UserController {
  // Listagem de users
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: [
          'id',
          'email',
          'nome',
          'lucro_desejado',
          'logo',
          'logo_url',
        ],
      });
      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error });
    }
  }

  // Mostra um user
  async show(req, res) {
    try {
      const { userId } = req;
      const { id } = req.params;

      let pk = id;
      if (req.user) {
        pk = userId;
      }

      const user = await User.findByPk(pk, {
        attributes: [
          'id',
          'email',
          'nome',
          'lucro_desejado',
          'logo',
          'logo_url',
        ],
      });

      if (!user) {
        return res.status(400).json({
          errors: ['User não encontrada'],
        });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  // Cadastro de um Usuário
  async create(req, res) {
    try {
      const dados = req.body;
      if (req.file) dados.logo = req.file.filename;

      const novoUser = await User.create(dados);

      const {
        id,
        email,
        nome,
        lucro_desejado,
        logo,
        logo_url,
      } = novoUser;

      req.userId = id;

      return res.json({
        id,
        email,
        nome,
        lucro_desejado,
        logo,
        logo_url,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  // Atualização de um Usuário
  async update(req, res) {
    try {
      const { userId } = req;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const dados = req.body;
      console.log(req);
      if (req.file) dados.logo = req.file.filename;

      const novosDados = await user.update(dados);

      const {
        id,
        email,
        nome,
        lucro_desejado,
        logo,
        logo_url,
      } = novosDados;

      return res.status(200).json({
        id,
        email,
        nome,
        lucro_desejado,
        logo,
        logo_url,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  // Apaga um user
  async delete(req, res) {
    try {
      const { userId } = req;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      await user.destroy();

      return res.status(200).json({ message: 'Usuário apagado com sucesso!' });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }
}

export default new UserController();
