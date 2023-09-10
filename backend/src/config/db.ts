import config from '../../sequelize.config';

export default {
  development: {
    username: config.development.username,
    password: config.development.password,
    database: config.development.database,
    host: config.development.host,
    port: config.development.port || 3306,
    dialect: 'mysql',
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data',
  },
  production: {
    username: config.production.username,
    password: config.production.password,
    database: config.production.database,
    host: config.production.host,
    port: config.production.port || 3306,
    dialect: 'mysql',
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data',
  },
}