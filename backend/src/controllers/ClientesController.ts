import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import clienteView from '../views/clientes_views';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Cliente from '../models/Cliente';

export default {
    // Lista todos os clientes cadastrados
    async index(request: Request, response: Response) {
        const clienteRepository = getRepository(Cliente);

        const clientes = await clienteRepository.find();

        return response.json(clienteView.renderMany(clientes));
    },

    // Mostra um cliente específica e suas informações
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const clienteRepository = getRepository(Cliente);

        const cliente = await clienteRepository.findOneOrFail(id);

        return response.json(clienteView.render(cliente));
    },

    // Cria um novo cliente no banco de dados
    async create(request: Request, response: Response) {
        const {
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
        } = request.body;

        let { senha } = request.body;

        console.log(senha);
        await bcrypt.hash(senha, 10).then(function (hash) {
            senha = hash;
        });

        const clienteRepository = getRepository(Cliente);

        const data = {
            email,
            senha,
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
        }

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            senha: Yup.string().required(),
            nome: Yup.string().required(),
            cpf: Yup.number().required(),
            telefone: Yup.number().required(),
            rua: Yup.string().required(),
            numero: Yup.number().required(),
            complemento: Yup.string(),
            referencia: Yup.string(),
            bairro: Yup.string().required(),
            cidade: Yup.string().required(),
            estado: Yup.string().required(),
            logo_path: Yup.string(),
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        const cliente = clienteRepository.create(data);

        await clienteRepository.save(cliente);

        return response.status(201).json(cliente);
    },

    // Atualiza os dados de um cliente
    async update(request: Request, response: Response) {
        interface LooseObject {
            [key: string]: any
        }

        const { id } = request.params;

        const {
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
        } = request.body;

        let { senha } = request.body;

        await bcrypt.hash(senha, 10).then((hash) => {
            senha = hash;
        });

        const clienteRepository = getRepository(Cliente);

        const cliente = await clienteRepository.findOneOrFail(id);

        // Validação dos dados
        const dataValidation: LooseObject = {
            id,
            email,
            senha,
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
        }

        const schema = Yup.object().shape({
            id: Yup.number().required(),
            email: Yup.string().email(),
            senha: Yup.string(),
            nome: Yup.string(),
            cpf: Yup.number(),
            telefone: Yup.number(),
            rua: Yup.string(),
            numero: Yup.number(),
            complemento: Yup.string(),
            referencia: Yup.string(),
            bairro: Yup.string(),
            cidade: Yup.string(),
            estado: Yup.string(),
            logo_path: Yup.string(),
        });

        await schema.validate(dataValidation, {
            abortEarly: false,
        })

        if (nome) cliente.nome = nome;
        if (email) cliente.email = email;
        if (senha) cliente.senha = senha;
        if (cpf) cliente.cpf = cpf;
        if (telefone) cliente.telefone = telefone;
        if (rua) cliente.rua = rua;
        if (numero) cliente.numero = numero;
        if (complemento) cliente.complemento = complemento;
        if (referencia) cliente.referencia = referencia;
        if (bairro) cliente.bairro = bairro;
        if (cidade) cliente.cidade = cidade;
        if (estado) cliente.estado = estado;

        await clienteRepository.save(cliente);

        return response.status(201).json(clienteView.render(cliente));
    },

    // Apaga os dados de um cliente
    async delete(request: Request, response: Response) {
        const { id } = request.body;

        const clienteRepository = getRepository(Cliente);

        await clienteRepository.delete(id);

        return response.json({ message: 'Deletado com sucesso! ' });
    },

    // Login
    async login(request: Request, response: Response) {
        const { email, senha } = request.body;

        const clienteRepository = getRepository(Cliente);

        const cliente = await clienteRepository.findOneOrFail({ email });

        const senhaBD = cliente.senha;

        const match = await bcrypt.compare(senha, senhaBD);

        if (!match) {
            return response.json({ message: 'Falha no login' });
        }
        else {
            const expiresIn = 7 * 24 * 60 * 60;
            const accessToken = jwt.sign({ id: cliente.id }, <string>process.env.SECRET_KEY_CLIENTE, {
                expiresIn: expiresIn
            });
            response.status(200).send({
                "user": cliente.id, type: 'cliente', "access_token": accessToken, "expires_in": expiresIn
            });

        }
    }
}