import { Model } from 'sequelize';

const model = (sequelize: any, DataTypes: any) => {
  class ForgotPasswordToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  ForgotPasswordToken.init(
    {
      email: DataTypes.STRING,
      token: DataTypes.TEXT,
      expired_at: DataTypes.BIGINT,
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      tableName: 'forgot_password_token',
    }
  );
  return ForgotPasswordToken;
};

export = model;
