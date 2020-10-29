module.exports = {
  up: async (queryInterface, Sequelize) => {
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('clientes');
  },
};
