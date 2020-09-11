import Sequelize from 'sequelize';

import Usuario from '../app/models/Usuario';
import File from '../app/models/File';
import Agendamentos from '../app/models/Agendamentos';

import databaseConfig from '../config/database';

const models = [Usuario, File, Agendamentos];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
