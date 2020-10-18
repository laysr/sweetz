import Confeitaria from '../models/Confeitaria';
import logoView from './logo_view';

export default {
    render(confeitaria: Confeitaria) {
        return {
            id: confeitaria.id,
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
            logo: logoView.render(confeitaria.logo),
        };
    },

    renderMany(confeitarias: Confeitaria[]) {
        return confeitarias.map(confeitaria => this.render(confeitaria));
    }
};