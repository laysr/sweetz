import Ingrediente from '../models/Ingrediente';

class IngredienteController {
  // Listagem de ingredientes padrão
  async indexPadrao(req, res) {
    try {
      const ingredientes = await Ingrediente.findAll({
        where: {
          user_id: 1,
        },
      });
      return res.status(200).json(ingredientes);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error });
    }
  }

  // Listagem de ingredientes
  async indexUser(req, res) {
    try {
      const ingredientes = await Ingrediente.findAll({
        where: {
          user_id: req.userId,
        },
      });
      return res.status(200).json(ingredientes);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error });
    }
  }

  // Mostra um ingrediente
  async show(req, res) {
    try {
      const { id } = req.params;
      const ingrediente = await Ingrediente.findByPk(id);
      if (ingrediente.user_id !== req.userId && ingrediente.user_id !== 1) {
        return res.status(401).json({
          errors: ['Acesso não autorizado'],
        });
      }
      return res.status(200).json(ingrediente);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error });
    }
  }

  // Cadastro de Ingredientes
  async create(req, res) {
    try {
      const dados = req.body;
      dados.custo = 0;
      // dados.preco = parseFloat(dados.preco);
      // dados.custo = parseFloat(dados.custo);
      dados.user_id = req.userId;
      const novoIngrediente = await Ingrediente.create(dados);

      return res.json(novoIngrediente);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error });
    }
  }

  // Atualização de um ingrediente
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const ingrediente = await Ingrediente.findByPk(id);

      if (ingrediente.user_id !== req.userId) {
        return res.status(401).json({
          errors: ['Acesso não autorizado'],
        });
      }

      if (!ingrediente) {
        return res.status(400).json({
          errors: ['Ingrediente não existe'],
        });
      }

      const {
        nome, quantidade, unidade, preco,
      } = req.body;

      const ingredienteAtualizado = await ingrediente.update({
        nome,
        quantidade,
        unidade,
        preco,
      });

      return res.status(200).json(ingredienteAtualizado);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error });
    }
  }

  // Apaga um ingrediente
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const ingrediente = await Ingrediente.findByPk(id);

      if (!ingrediente) {
        return res.status(400).json({
          errors: ['Ingrediente não existe'],
        });
      }

      if (ingrediente.user_id !== req.userId) {
        return res.status(401).json({
          errors: ['Acesso não autorizado'],
        });
      }

      await ingrediente.destroy();

      return res
        .status(200)
        .json({ message: 'Ingrediente apagado com sucesso!' });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error });
    }
  }
}

export default new IngredienteController();
