import { Model } from 'sequelize';

const model = (sequelize: any, DataTypes: any) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      tableName: 'roles',
    }
  );
  return Role;
};

export = model;
