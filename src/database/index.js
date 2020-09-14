import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import Usuario from '../app/models/Usuario';
import File from '../app/models/File';

import Agendamentos from '../app/models/Agendamentos';

import databaseConfig from '../config/database';

const models = [Usuario, File, Agendamentos];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/clinic',
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}

export default new Database();
