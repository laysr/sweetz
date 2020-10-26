import Confeitaria from '../models/Confeitaria';

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
          'lucro_desejado',
          'telefone',
          'rua',
          'numero',
          'complemento',
          'bairro',
          'cidade',
          'estado',
          'logo',
          'logo_url',
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
          'lucro_desejado',
          'telefone',
          'rua',
          'numero',
          'complemento',
          'bairro',
          'cidade',
          'estado',
          'logo',
          'logo_url',
        ],
      });

      if (!confeitaria) {
        return res.status(400).json({
          errors: ['Confeitaria não encontrada'],
        });
      }

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
      const dados = req.body;
      if (req.file) dados.logo = req.file.filename;

      const novaConfeitaria = await Confeitaria.create(dados);

      const {
        id,
        email,
        nome,
        cpf,
        nome_confeitaria,
        cnpj,
        lucro_desejado,
        telefone,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        logo,
        logo_url,
      } = novaConfeitaria;

      req.userId = id;

      return res.json({
        id,
        email,
        nome,
        cpf,
        nome_confeitaria,
        cnpj,
        lucro_desejado,
        telefone,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        logo,
        logo_url,
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

      const confeitaria = await Confeitaria.findByPk(userId);

      if (!confeitaria) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const dados = req.body;
      console.log(req);
      if (req.file) dados.logo = req.file.filename;

      const novosDados = await confeitaria.update(dados);

      const {
        id,
        email,
        nome,
        cpf,
        nome_confeitaria,
        cnpj,
        lucro_desejado,
        telefone,
        rua,
        numero,
        complemento,
        referencia,
        bairro,
        cidade,
        estado,
        logo,
        logo_url,
      } = novosDados;

      return res.status(200).json({
        id,
        email,
        nome,
        cpf,
        nome_confeitaria,
        cnpj,
        lucro_desejado,
        telefone,
        rua,
        numero,
        complemento,
        referencia,
        bairro,
        cidade,
        estado,
        logo,
        logo_url,
      });
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
