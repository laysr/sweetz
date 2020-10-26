module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('ingredientes', [
      {
        confeitaria_id: 1,
        nome: 'Farinha de Trigo',
        quantidade: 1000,
        unidade: 'g',
        preco: 3.76,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        confeitaria_id: 1,
        nome: 'Chocolate meio amargo barra',
        quantidade: 200,
        unidade: 'g',
        preco: 4.83,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        confeitaria_id: 1,
        nome: 'Leite Condensado',
        quantidade: 395,
        unidade: 'g',
        preco: 3.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        confeitaria_id: 1,
        nome: 'Açúcar',
        quantidade: 1000,
        unidade: 'g',
        preco: 2.39,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        confeitaria_id: 1,
        nome: 'Ovos',
        quantidade: 30,
        unidade: 'un',
        preco: 13.90,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        confeitaria_id: 1,
        nome: 'Chocolate 50% cacau em pó',
        quantidade: 200,
        unidade: 'g',
        preco: 12.79,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        confeitaria_id: 1,
        nome: 'margarina',
        quantidade: 500,
        unidade: 'g',
        preco: 3.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ingredientes', null, {});
  },
};
