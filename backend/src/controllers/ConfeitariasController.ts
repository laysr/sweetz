import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import confeitariaView from '../views/confeitarias_views';
import * as Yup from 'yup';

import Confeitaria from '../models/Confeitaria';

export default {
    // Lista todas as confeitarias cadastradas
    async index(request: Request, response: Response) {
        const confeitariaRepository = getRepository(Confeitaria);

        const confeitarias = await confeitariaRepository.find();

        return response.json(confeitariaView.renderMany(confeitarias));
    },

    // Mostra uma confeitaria específica e suas informações
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const confeitariaRepository = getRepository(Confeitaria);

        const confeitaria = await confeitariaRepository.findOneOrFail(id);

        return response.json(confeitariaView.render(confeitaria));
    },

    // Cria uma nova confeitaria no banco de dados
    async create(request: Request, response: Response) {
        const {
            nome,
            cpf,
            nome_negocio,
            cnpj,
            descricao,
            telefone,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
        } = request.body;

        const confeitariaRepository = getRepository(Confeitaria);

        const requestLogo = request.file as Express.Multer.File;

        const logo_path = requestLogo.filename;

        const data = {
            nome,
            cpf,
            nome_negocio,
            cnpj,
            descricao,
            telefone,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            logo_path
        }

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            cpf: Yup.number().required(),
            nome_negocio: Yup.string().required(),
            cnpj: Yup.number(),
            descricao: Yup.string().required(),
            telefone: Yup.number().required(),
            rua: Yup.string().required(),
            numero: Yup.number().required(),
            complemento: Yup.string(),
            bairro: Yup.string().required(),
            cidade: Yup.string().required(),
            estado: Yup.string().required(),
            logo_path: Yup.string(),
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        const confeitaria = confeitariaRepository.create(data);

        await confeitariaRepository.save(confeitaria);

        return response.status(201).json(confeitaria);
    },

    // Atualiza os dados de uma confeitaria
    async update(request: Request, response: Response){
        interface LooseObject {
            [key: string]: any
        }

        const { id } = request.params;
        
        const {
            nome,
            cpf,
            nome_negocio,
            cnpj,
            descricao,
            telefone,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
        } = request.body;

        const requestLogo = request.file as Express.Multer.File;
        
        const confeitariaRepository = getRepository(Confeitaria);
        
        const confeitaria = await confeitariaRepository.findOneOrFail(id);

        // Validação dos dados
        const dataValidation: LooseObject = {
            id,
            nome,
            cpf,
            nome_negocio,
            cnpj,
            descricao,
            telefone,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
        }

        if(requestLogo) dataValidation.logo_path = requestLogo.filename;

        const schema = Yup.object().shape({
            id: Yup.number().required(),
            nome: Yup.string(),
            cpf: Yup.number(),
            nome_negocio: Yup.string(),
            cnpj: Yup.number(),
            descricao: Yup.string(),
            telefone: Yup.number(),
            rua: Yup.string(),
            numero: Yup.number(),
            complemento: Yup.string(),
            bairro: Yup.string(),
            cidade: Yup.string(),
            estado: Yup.string(),
            logo_path: Yup.string(),
        });

        await schema.validate(dataValidation, {
            abortEarly: false,
        })

        if (nome) confeitaria.nome = nome;
        if (cpf) confeitaria.cpf = cpf;
        if (nome_negocio) confeitaria.nome_negocio = nome_negocio;
        if (cnpj) confeitaria.cnpj = cnpj;
        if (descricao) confeitaria.descricao = descricao;
        if (telefone) confeitaria.telefone = telefone;
        if (rua) confeitaria.rua = rua;
        if (numero) confeitaria.numero = numero;
        if (complemento) confeitaria.complemento = complemento;
        if (bairro) confeitaria.bairro = bairro;
        if (cidade) confeitaria.cidade = cidade;
        if (estado) confeitaria.estado = estado;
        if (requestLogo) confeitaria.logo_path = requestLogo.filename;

        await confeitariaRepository.save(confeitaria);

        return response.status(201).json(confeitariaView.render(confeitaria));
    },

    // Apaga os dados de uma confeitaria
    async delete(request: Request, response: Response) {
        const { id } = request.body;

        const confeitariaRepository = getRepository(Confeitaria);

        await confeitariaRepository.delete(id);

        return response.json({ message: 'Deletado com sucesso! '});
    },    
}