import Ingrediente from '../models/Ingrediente';

export default {
    render(ingrediente: Ingrediente) {
        return {
            id: ingrediente.id,
            cod_confeitaria: ingrediente.confeitaria,
            ingrediente: ingrediente.nome,
            quantidade: ingrediente.quantidade,
            unidade: ingrediente.unidade,
            preco: ingrediente.preco,
        };
    },

    renderMany(ingrediente: Ingrediente[]) {
        if (ingrediente) {
        return ingrediente.map(ingrediente => this.render(ingrediente));
        }
    }
};