import Confeitaria from '../models/Confeitaria';
import ingredientes_views from './ingredientes_views';

export default {
    render(confeitaria: Confeitaria) {
        return {
            id: confeitaria.id,
            email: confeitaria.email,
            senha: confeitaria.senha,
            nome: confeitaria.nome,
            cpf: confeitaria.cpf,
            nome_negocio: confeitaria.nome_negocio,
            cnpj: confeitaria.cnpj,
            descricao: confeitaria.descricao,
            telefone: confeitaria.telefone,
            rua: confeitaria.rua,
            numero: confeitaria.numero,
            complemento: confeitaria.complemento,
            bairro: confeitaria.bairro,
            cidade: confeitaria.cidade,
            estado: confeitaria.estado,
            url: `http://localhost:3333/uploads/${confeitaria.logo_path}`,
            ingredientes: ingredientes_views.renderMany(confeitaria.ingredientes),
        };
    },

    renderMany(confeitarias: Confeitaria[]) {
        return confeitarias.map(confeitaria => this.render(confeitaria));
    }
};