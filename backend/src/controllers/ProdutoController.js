import Produto from '../models/Produto';

class ProdutoController {
  // Listagem de produtos
  async index(req, res) {
    try {
      const produtos = await Produto.findAll();
      return res.status(200).json(produtos);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error });
    }
  }

  // Mostra um produto
  async show(req, res) {
    try {
      const { id } = req.params;

      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(400).json({
          errors: ['Produto não encontrado'],
        });
      }

      if (produto.confeitaria_id !== req.userId) {
        return res.status(401).json({
          errors: ['Acesso não autorizado'],
        });
      }

      return res.status(200).json(produto);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error });
    }
  }

  // Cadastro de Clientes
  async create(req, res) {
    try {
      const dados = req.body;
      dados.confeitaria_id = req.userId;
      if (req.file) dados.image = req.file.filename;

      const novoProduto = await Produto.create(dados);

      return res.json(novoProduto);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error });
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

      if (produto.confeitaria_id !== req.userId) {
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
        nome, descricao, preco, custo, image: null,
      };
      if (req.file) dados.image = req.file.filename;

      const produtoAtualizado = await produto.update(dados);

      return res.status(200).json(produtoAtualizado);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error });
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

      if (produto.confeitaria_id !== req.userId) {
        return res.status(401).json({
          errors: ['Acesso não autorizado'],
        });
      }

      await produto.destroy();

      return res.status(200).json({ message: 'Produto apagado com sucesso!' });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error });
    }
  }
}

export default new ProdutoController();
