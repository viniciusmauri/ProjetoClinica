import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import Usuario from '../app/models/Usuario';
import File from '../app/models/File';

import Agendamento from '../app/models/Agendamento';

import databaseConfig from '../config/database';

const models = [Usuario, File, Agendamento];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
