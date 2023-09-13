import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import BaseController from './BaseController';
import { Users } from '../services/UserService';
import { Auth } from '../services/AuthService';
import { JWT_KEY } from '../constants/auth';
import Validator from 'validatorjs';
import { ROLES } from '../constants/roles';
import mailtrap, {SENDER_EMAIL, SENDER_NAME} from '../utils/mailtrap';

export default class AuthController extends BaseController {
  /**
   * Handle POST /auth/login
   * @param req 
   * @param res 
   * @param next 
   */
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      AuthController.validateForm(req.body, {
        email: 'required',
        password: 'required'
      });

      const resp = await Users.getByEmail(req.body.email.toLowerCase(), {
        withPassword: true,
      });

      if (!resp) {
        super.throwBadRequest('user_login', 'Check again email or password!');
      }

      const isSuccess = bcrypt.compareSync(req.body.password, resp.password);

      if (!isSuccess) {
        super.throwBadRequest('user_login', 'Wrong email or password!');
      }

      const data = {
        id: resp.id,
        name: resp.name,
        email: resp.email,
        role_id: resp.role_id,
        role_name: resp.role.name,
      };

      const token = jwt.sign(data, JWT_KEY, { expiresIn: 9999999999 });

      res.json({
        status: 'success',
        data: {
          token,
          ...data,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      AuthController.validateForm(req.body, {
        email: 'required',
        password: 'required',
        name: 'required'
      });

      const user = await Users.getByEmail(req.body.email.toLowerCase());
      if (user) {
        throw super.throwBadRequest('sign_up', 'email is already used');
      }

      await Users.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        name: req.body.name,
        role_id: ROLES.viewer.id,
        is_active: true,
      })

      res.json({
        status: 'success',
        message: 'new user was successfully created!',
        data: {
          email: req.body.email,
          name: req.body.name,
        },
      })
    } catch (error) {
      next(error);
    }
  }

  public static async sendForgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      AuthController.validateForm(req.body, {
        email: 'required'
      });

      const user = await Users.getByEmail(req.body.email.toLowercase());
      if (!user) {
        throw super.throwBadRequest('forgot_password', 'email was not found!');
      }

      const token = await Auth.createForgotToken(req.body.email);

      // send email here
      await mailtrap.send({
        from: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: [{ email: req.body.email }],
        subject: "Forgot password email!",
        text: `You can reset your password here http://front-end-localhost:8000/reset-password?token=${token}`,
      });

      res.json({
        status: 'success',
        message: 'Email has been sent!'
      });
    } catch (error) {
      next(error);
    }
  }

  public static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      AuthController.validateForm({
        ...req.body,
        token: req.query.token,
      }, {
        password: 'required',
        token: 'required'
      });

      const forgotToken = await Auth.getToken(req.query.token as string);
      if (!forgotToken) {
        throw super.throwBadRequest('reset_passowrd', 'forgot password token was not found!');
      }

      if (Date.now() > forgotToken.expired_at) {
        throw super.throwBadRequest('reset_passowrd', 'Token has been expired!');
      }

      const user = await Users.getByEmail(forgotToken.email);
      if (!forgotToken) {
        throw super.throwBadRequest('reset_passowrd', 'email was not found!');
      }

      const resp = await Users.update(Number(user.id), {
        password: bcrypt.hashSync(req.body.password, 10),
      });

      res.json({
        status: 'success',
        message: 'Password was updated successfully!',
        data: resp,
      });
    } catch (error) {
      next(error);
    }
  }

  private static validateForm(data: any, rules: any) {
    const validation = new Validator(data, rules);
    if (validation.fails()) {
      super.throwFormValidationError('auth_validation', validation.errors.errors);
    }

    return true;
  }
}