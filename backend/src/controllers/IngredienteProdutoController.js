/* eslint-disable max-len */
import IngredienteProduto from '../models/IngredienteProduto';
import Ingrediente from '../models/Ingrediente';
import Produto from '../models/Produto';

/* Produto.hasMany(IngredienteProduto);
IngredienteProduto.belongsTo(Produto, { as: 'ingredientes', foreignKey: 'produto_id' });
IngredienteProduto.belongsTo(Ingrediente, { as: 'ingredienteProduto', foreignKey: 'ingrediente_id' }); */
// Ingrediente.belongsToMany(Produto, { through: IngredienteProduto });
// Ingrediente.belongsToMany(IngredienteProduto);

class IngredienteProdutoController {
  // Listagem de ingredientes por produto ou user
  async index(req, res) {
    try {
      const { produto_id } = req.body;
      let ingredientes = null;
      if (produto_id) {
        ingredientes = await IngredienteProduto.findAll({
          where: {
            produto_id,
            user_id: req.userId,
          },
          include: [
            {
              as: 'ingrediente',
              model: Ingrediente,
              attributes: ['nome', 'quantidade', 'unidade', 'preco'],
            },
          ],
        });
      } else {
        ingredientes = await Produto.findAll({
          where: {
            user_id: req.userId,
          },
          include: [
            {
              as: 'ingredientes',
              model: IngredienteProduto,
              attributes: ['quantidade', 'unidade'],
              include: [
                {
                  as: 'ingrediente',
                  model: Ingrediente,
                  attributes: ['nome', 'quantidade', 'unidade', 'preco'],
                },
              ],
            },
          ],
        });
      }
      return res.status(200).json(ingredientes);
    } catch (error) {
      return res.status(400).json({ errors: error });
    }
  }

  // Mostra um ingrediente de um Produto
  async show(req, res) {
    try {
      const { id } = req.params;
      const ingrediente = await IngredienteProduto.findByPk(id);
      if (ingrediente.user_id !== req.userId) {
        return res.status(401).json({
          errors: ['Acesso não autorizado'],
        });
      }
      return res.status(200).json(ingrediente);
    } catch (error) {
      return res.status(400).json({ errors: error });
    }
  }

  // Cadastro de Ingredientes em um Produto
  async create(req, res) {
    try {
      const dados = req.body;
      dados.user_id = req.userId;

      // Checa se o ingrediente pertence à user logada
      const ingrediente = await Ingrediente.findByPk(dados.ingrediente_id);
      if (ingrediente.user_id !== dados.user_id) {
        return res.status(401).json({
          errors: ['Acesso não autorizado'],
        });
      }

      // Checa se o produto pertence à user logada
      const produto = await Produto.findByPk(dados.produto_id);
      if (produto.user_id !== dados.user_id) {
        return res.status(401).json({
          errors: ['Acesso não autorizado'],
        });
      }
      /* const date = new Date();
      dados.created_at = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const novoId = await IngredienteProduto.sequelize.query(
        'INSERT INTO ingredientes_produtos (id, user_id, ingrediente_id, produto_id, quantidade, unidade, created_at, updated_at) VALUES (:id, :user_id, :ingrediente_id, :produto_id, :quantidade, :unidade, :created_at, :updated_at);',
        {
          model: IngredienteProduto,
          replacements: {
            id: 1,
            user_id: dados.user_id,
            ingrediente_id: dados.ingrediente_id,
            produto_id: dados.produto_id,
            quantidade: dados.quantidade,
            unidade: dados.unidade,
            created_at: dados.created_at,
            updated_at: dados.created_at,
          },
        },
      ); */

      const novoIngrediente = await IngredienteProduto.create(dados);

      return res.json(novoIngrediente);
    } catch (error) {
      return res.status(400).json({ errors: error });
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

      const ingrediente = await IngredienteProduto.findByPk(id);

      if (!ingrediente) {
        return res.status(400).json({
          errors: ['IngredienteProduto não existe'],
        });
      }

      if (ingrediente.user_id !== req.userId) {
        return res.status(401).json({
          errors: ['Acesso não autorizado'],
        });
      }

      const { quantidade, unidade } = req.body;

      const ingredienteAtualizado = await ingrediente.update({
        quantidade,
        unidade,
      });

      return res.status(200).json(ingredienteAtualizado);
    } catch (error) {
      return res.status(400).json({ errors: error });
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

      const ingrediente = await IngredienteProduto.findByPk(id);

      if (!ingrediente) {
        return res.status(400).json({
          errors: ['IngredienteProduto não existe'],
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
        .json({ message: 'IngredienteProduto apagado com sucesso!' });
    } catch (error) {
      return res.status(400).json({ errors: error });
    }
  }
}

export default new IngredienteProdutoController();
