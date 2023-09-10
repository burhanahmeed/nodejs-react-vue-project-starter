import fs from 'fs';
import path from 'path';
const Sequelize = require('sequelize');
import config from '../config/db';

const conf = config.production;

export const sequelize = new Sequelize(conf.database, conf.username, conf.password, {
  host: conf.host,
  dialect: conf.dialect,
  operatorAlias: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// current file basename
const basename = path.basename(__filename);

// our db object
const db: any = {};

// so we don't reload unecessarily
let loaded = false;

const createModels = () => {
  // if already loaded, return cached object
  if (loaded) return db;

  // create an array of model files' basenames
  const filenames = fs.readdirSync(__dirname).filter((file: string) => {
    return (
      // filter out the current `index.ts` file
      file.indexOf('.') !== 0 && file !== basename && file !== 'index.js'
    );
  });

  filenames.map((file: any) => {
    // use `require` to load our models
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

    db[model.name] = model;
  });

  // run `.associate` if applicable
  Object.keys(db).map((model) => {
    if (db[model].associate) {
      db[model].associate(db);
    }
  });

  // attach both our instance and Sequelize to our db object
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  loaded = true;

  return db;
};

export default createModels();

export { createModels };
