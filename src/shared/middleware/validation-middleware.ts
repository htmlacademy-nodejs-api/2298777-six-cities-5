import { Middleware } from './index.js';
import { ClassConstructor } from 'class-transformer';

export class ValidationMiddleware implements Middleware {
  constructor(
    private dto: ClassConstructor<object>
  ) {
  }

  public async execute(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): void {

  }
}
