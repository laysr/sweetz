import User from '../models/User';
import Produto from '../models/Produto';
import Ingrediente from '../models/Ingrediente';
import IngredienteProduto from '../models/IngredienteProduto';

class ProdutoController {
  // Listagem de produtos
  async index(req, res) {
    try {
      const produtos = await Produto.findAll();
      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(400).json({ errors: error });
    }
  }

  // Mostra um produto
  async show(req, res) {
    try {
      const { id } = req.params;

      const produto = await Produto.findByPk(id, {
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

      if (!produto) {
        return res.status(400).json({
          errors: ['Produto não encontrado'],
        });
      }

      if (produto.user_id !== req.userId) {
        return res.status(401).json({
          errors: ['Acesso não autorizado'],
        });
      }

      return res.status(200).json(produto);
    } catch (error) {
      return res.status(400).json({ errors: error });
    }
  }

  // Cadastro de Clientes
  async create(req, res) {
    try {
      const dados = req.body;
      dados.user_id = req.userId;
      if (req.file) dados.image = req.file.filename;

      const novoProduto = await Produto.create(dados);

      return res.json(novoProduto);
    } catch (error) {
      return res.status(400).json({ errors: error });
    }
  }

  // Atualização de um produto
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const produto = await Produto.findByPk(id);

      if (produto.user_id !== req.userId) {
        return res.status(401).json({
          errors: ['Acesso não autorizado'],
        });
      }

      if (!produto) {
        return res.status(400).json({
          errors: ['Produto não existe'],
        });
      }

      const {
        nome, descricao, preco, custo,
      } = req.body;
      const dados = {
        nome,
        descricao,
        preco,
        custo,
        image: null,
      };
      if (req.file) dados.image = req.file.filename;

      const produtoAtualizado = await produto.update(dados);

      return res.status(200).json(produtoAtualizado);
    } catch (error) {
      return res.status(400).json({ errors: error });
    }
  }

  // Apaga um produto
  async delete(req, res) {
    try {
      const { id } = req.params;

      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(400).json({
          errors: ['Produto não existe'],
        });
      }

      if (produto.user_id !== req.userId) {
        return res.status(401).json({
          errors: ['Acesso não autorizado'],
        });
      }

      await produto.destroy();

      return res.status(200).json({ message: 'Produto apagado com sucesso!' });
    } catch (error) {
      return res.status(400).json({ errors: error });
    }
  }

  async custo(req, res) {
    const { id } = req.body;

    const user = await User.findByPk(req.userId, {
      attributes: ['lucro_desejado'],
    });

    const produto = await Produto.findByPk(id, {
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

    let custo = 0;
    let preco_sugerido = 0;

    if (produto.ingredientes) {
      custo = produto.ingredientes.reduce((ac, ingrediente) => {
        const preco = (ingrediente.quantidade / ingrediente.ingrediente.quantidade)
            * ingrediente.ingrediente.preco;
        return ac + preco;
      }, 0);
      custo = custo.toFixed(2);

      if (user.dataValues.lucro_desejado) {
        preco_sugerido = custo * (1 + parseFloat(user.dataValues.lucro_desejado));
        preco_sugerido = preco_sugerido.toFixed(2);
      }

      const produtoAtualizado = await produto.update({
        custo: parseFloat(custo),
        preco_sugerido,
      });
      console.log(preco_sugerido);
      return res.json(produtoAtualizado);
    }

    return res.json(produto);
  }
}

export default new ProdutoController();
