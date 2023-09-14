import { Model } from 'sequelize';

const model = (sequelize: any, DataTypes: any) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  File.init(
    {
      name: DataTypes.STRING,
      image_path: DataTypes.TEXT
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      tableName: 'files',
    }
  );
  return File;
};

export = model;
