import jwt from 'jsonwebtoken';
import Cliente from '../models/Cliente';
import Confeitaria from '../models/Confeitaria';

class TokenController {
  async clienteStore(req, res) {
    try {
      const { email = '', senha = '' } = req.body;

      if (!email || !senha) {
        return res.status(401).json({
          errors: ['Credenciais inválidas'],
        });
      }

      const cliente = await Cliente.findOne({ where: { email } });

      if (!cliente) {
        return res.status(401).json({
          errors: ['Usuário não existe'],
        });
      }

      if (!(await cliente.validacaoSenha(senha))) {
        return res.status(401).json({
          errors: ['Senha incorreta'],
        });
      }

      const { id } = cliente;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET_CLIENTE, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async confeitariaStore(req, res) {
    try {
      const { email = '', senha = '' } = req.body;

      if (!email || !senha) {
        return res.status(401).json({
          errors: ['Credenciais inválidas'],
        });
      }

      const confeitaria = await Confeitaria.findOne({ where: { email } });

      if (!confeitaria) {
        return res.status(401).json({
          errors: ['Usuário não existe'],
        });
      }

      if (!(await confeitaria.validacaoSenha(senha))) {
        return res.status(401).json({
          errors: ['Senha incorreta'],
        });
      }

      const { id } = confeitaria;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET_CONFEITARIA, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }
}

export default new TokenController();
