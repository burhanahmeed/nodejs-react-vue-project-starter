import { ModelStatic, Op } from 'sequelize';
import db from '../models';
import bcrypt from 'bcrypt';

export default class AuthService {
  private forgotPasswordToken: ModelStatic<any>;

  constructor() {
    this.forgotPasswordToken = db.ForgotPasswordToken;
  }

  async createForgotToken(email: string) {
    try {
      const token = bcrypt.hashSync(`${Date.now()}`, 10);

      await this.forgotPasswordToken.create({
        email: email.toLocaleLowerCase(),
        token,
        expired_at: Date.now() + (1000 * 60 * 20), // 20 minutes
      });

      return token;
    } catch (error) {
      throw error;
    }
  }

  getToken(token: string) {
    return this.forgotPasswordToken.findOne({
      where: { token },
    });
  }
}

export const Auth = new AuthService();
