import { Request, Response, NextFunction } from 'express';
import { Middleware } from './index.js';
import multer, {diskStorage} from 'multer';
import { extension } from 'mime-types';
import crypto from 'node:crypto';


export class UploadFileMiddleware implements Middleware {
  constructor(
    private readonly uploadDirectory: string,
    private readonly fieldName: string,
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename(_req, file, callback) {
        const fileExtension = extension(file.mimetype);
        const fileName = crypto.randomUUID();
        callback(null, `${fileName}.${fileExtension}`);
      },
    });

    const uploadSingleFileMiddleware = multer({storage})
      .single(this.fieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
