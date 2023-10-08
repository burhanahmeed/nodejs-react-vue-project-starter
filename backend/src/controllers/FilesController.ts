import { Request, Response, NextFunction } from 'express';
import Validator from 'validatorjs';
import BaseController from './BaseController';
import { File } from "../services/FileService";
import { BASE_URL } from '../config/common';

export default class FilesController extends BaseController {
  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      FilesController.validateForm(req.body, {
        name: 'required'
      });

      if (!req.file) {
        throw super.throwBadRequest('create_file', 'Image must be exist');
      }

      const created = await File.store({
        ...req.body,
        image_path: req.file.filename
      });

      res.json({
        success: true,
        message: 'File has been stored',
        data: { id: created.id }
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

      const data = await File.listAll({ filters });

      res.json({
        success: true,
        message: 'File has been fetched',
        data
      });
    } catch (error) {
      next(error);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await File.getById(Number(req.params.id));
      if (!data) {
        super.throwNotFoundError('get_file', 'file was not found');
      }

      res.json({
        success: true,
        message: 'File has been fetched',
        data: {
          ...data.toJSON(),
          previewImage: `${BASE_URL}/uploads/${data.image_path}`
        }
      });
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