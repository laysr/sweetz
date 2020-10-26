module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ingredientes_produtos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      confeitaria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'confeitarias',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      ingrediente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ingredientes',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      produto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ingredientes',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('ingredientes_produtos');
  },
};
