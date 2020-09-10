module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('usuarios', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: async queryInterface => {
    return queryInterface.removeColumn('usuarios', 'avatar_id');
  },
};
