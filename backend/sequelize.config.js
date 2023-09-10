require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
    migrationStorageTableName: 'sequelize_meta',
    // Use a different storage. Default: none
    seederStorage: 'sequelize',
    // Use a different file name. Default: sequelize-data.json
    seederStoragePath: 'sequelizeData.json',
    // Use a different table name. Default: SequelizeData
    seederStorageTableName: 'sequelize_data',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
    migrationStorageTableName: 'sequelize_meta',
    // Use a different storage. Default: none
    seederStorage: 'sequelize',
    // Use a different file name. Default: sequelize-data.json
    seederStoragePath: 'sequelizeData.json',
    // Use a different table name. Default: SequelizeData
    seederStorageTableName: 'sequelize_data',
  },
};
