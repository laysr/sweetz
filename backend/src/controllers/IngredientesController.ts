import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ingredienteView from '../views/ingredientes_views';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Ingrediente from '../models/Ingrediente';

export default {
    // Lista todos os ingredientes
    async index (request: Request, response: Response) {
        const ingredienteRepository = getRepository(Ingrediente);

        const ingredientes = await ingredienteRepository.find();

        return response.json(ingredienteView.renderMany(ingredientes));
    },

    // Mostra um ingrediente
    async show (request: Request, response: Response) {
        const { id } = request.params;

        const ingredienteRepository = getRepository(Ingrediente);

        const ingrediente = await ingredienteRepository.findOneOrFail(id);

        return response.json(ingredienteView.render(ingrediente));
    },

    // Cria um ingrediente
    async create (request: Request, response: Response) {
        const {
            cod_confeitaria,
            nome,
            quantidade,
            unidade, 
            preco
        } = request.body;

        const ingredienteRepository = getRepository(Ingrediente);

        const data = {
            cod_confeitaria,
            nome,
            quantidade,
            unidade,
            preco
        }

        const schema = Yup.object().shape({
            cod_confeitaria: Yup.number().required(),
            nome: Yup.string().required(),
            quantidade: Yup.number().required(),
            unidade: Yup.string().required(),
            preco: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        const ingrediente = ingredienteRepository.create(data);

        await ingredienteRepository.save(ingrediente);

        return response.status(201).json(ingredienteView.render(ingrediente));
    },

    // Atualiza um ingrediente
    async update (request: Request, response: Response) {
        const { id } = request.params;

        const {
            cod_confeitaria,
            nome,
            quantidade,
            unidade, 
            preco
        } = request.body;

        const ingredienteRepository = getRepository(Ingrediente);

        const ingrediente = await ingredienteRepository.findOneOrFail(id);

        const data = {
            id,
            cod_confeitaria,
            nome,
            quantidade,
            unidade,
            preco
        }

        const schema = Yup.object().shape({
            id: Yup.number().required(),
            cod_confeitaria: Yup.number(),
            nome: Yup.string(),
            quantidade: Yup.number(),
            unidade: Yup.string(),
            preco: Yup.number(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        if(nome) ingrediente.nome = nome;
        if(quantidade) ingrediente.quantidade = quantidade;
        if(unidade) ingrediente.unidade = unidade;
        if(preco) ingrediente.preco = preco;

        await ingredienteRepository.save(ingrediente);

        return response.status(201).json(ingredienteView.render(ingrediente));
    },

    // Apaga um ingrediente
    async delete (request: Request, response: Response) {
        const { id } = request.body;

        const ingredienteRepository = getRepository(Ingrediente);

        await ingredienteRepository.delete(id);

        return response.json({ message: 'Deletado com sucesso! ' });
    }
}