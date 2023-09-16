import { Request, Response, NextFunction } from 'express';
import Validator from 'validatorjs';
import BaseController from './BaseController';
import { File } from "../services/FileService";

export default class FilesController extends BaseController {
  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      FilesController.validateForm(req.body, {
        name: 'required'
      });

      if (!req.file) {
        throw super.throwBadRequest('create_file', 'Image must be exist');
      }

      await File.store({
        ...req.body,
        image_path: req.file.filename
      });

      res.json({
        success: true,
        message: 'File has been stored'
      });
    } catch (error) {
      next(error);
    }
  }

  public static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const filters: any = {}
      if (req.query.name) {
        filters.search = req.query.name;
      }

      await File.listAll({ filters });
    } catch (error) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      FilesController.validateForm(req.body, {
        name: 'required'
      });

      if (req.file) {
        req.body.image_path = req.file.filename;
      }

      await File.updateByIdIfExist(Number(req.params.id), req.body);

      res.json({
        success: true,
        message: 'File has been updated',
        data: { id: req.params.id, name: req.body.name }
      });
    } catch (error) {
      next(error);
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await File.deleteByIdIfExist(Number(req.params.id));

      res.json({
        success: true,
        message: 'File has been deleted',
        data: { id: req.params.id, name: req.body.name }
      });
    } catch (error) {
      next(error);
    }
  }

  private static validateForm(data: any, rules: any) {
    const validation = new Validator(data, rules);
    if (validation.fails()) {
      super.throwFormValidationError('file_validation', validation.errors.errors);
    }

    return true;
  }
}