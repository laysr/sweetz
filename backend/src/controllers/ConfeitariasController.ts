import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import confeitariaView from '../views/confeitarias_views';
import * as Yup from 'yup';

import Confeitaria from '../models/Confeitaria';

export default {
    async index(request: Request, response: Response) {
        const confeitariaRepository = getRepository(Confeitaria);

        const confeitarias = await confeitariaRepository.find({
            relations: ['logo'],
        });

        return response.json(confeitariaView.renderMany(confeitarias));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const confeitariaRepository = getRepository(Confeitaria);

        const confeitaria = await confeitariaRepository.findOneOrFail(id, {
            relations: ['logo'],
        });

        return response.json(confeitariaView.render(confeitaria));
    },

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

        const logo = { path: requestLogo.filename }

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
            logo
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
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
            logo: Yup.object().shape({
                path: Yup.string().required()
            })
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        const confeitaria = confeitariaRepository.create(data);

        await confeitariaRepository.save(confeitaria);

        console.log('teste');

        return response.status(201).json(confeitaria);
    }
}