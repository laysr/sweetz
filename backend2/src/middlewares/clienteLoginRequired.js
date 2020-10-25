import jwt from 'jsonwebtoken';
import Cliente from '../models/Cliente';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  const token = authorization.split(' ')[1];

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET_CLIENTE);
    const { id, email } = dados;

    const cliente = await Cliente.findOne({
      where: {
        id,
        email,
      },
    });

    if (!cliente) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
