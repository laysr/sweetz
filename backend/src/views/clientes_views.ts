import Cliente from '../models/Cliente';

export default {
    render(cliente: Cliente) {
        return {
            id: cliente.id,
            email: cliente.email,
            senha: cliente.senha,
            nome: cliente.nome,
            cpf: cliente.cpf,
            telefone: cliente.telefone,
            rua: cliente.rua,
            numero: cliente.numero,
            complemento: cliente.complemento,
            referencia: cliente.referencia,
            bairro: cliente.bairro,
            cidade: cliente.cidade,
            estado: cliente.estado,
        };
    },

    renderMany(confeitarias: Cliente[]) {
        return confeitarias.map(cliente => this.render(cliente));
    }
};