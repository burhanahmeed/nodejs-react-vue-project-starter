import { Model } from 'sequelize';

const model = (sequelize: any, DataTypes: any) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      tableName: 'users',
    }
  );
  return User;
};

export = model;
