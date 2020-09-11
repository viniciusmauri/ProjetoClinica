import Sequelize, { Model } from 'sequelize';

class Agendamento extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    this.belongsTo(models.Usuario, {
      foreignKey: 'funcionario_id',
      as: 'funcionario',
    });
  }
}

export default Agendamento;
