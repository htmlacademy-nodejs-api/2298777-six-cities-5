import { inject, injectable } from 'inversify';
import { AbstractController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';
import { Request, Response } from 'express';
import { ParamsRentId, RentService } from '../rent/index.js';
import { CommentRdo, CommentService, CreateCommentDto, DEFAULT_COMMENT_COUNT } from './index.js';
import { fillDTO } from '../../helpers/common.js';
import { ValidateObjectIdMiddleware } from '../../middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../middleware/validate-dto.middleware.js';
import { UserService } from '../user/index.js';
import { DocumentExistsMidleware } from '../../middleware/document-exists.middleware.js';

@injectable()
export class CommentController extends AbstractController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.UserService) userService: UserService,
    @inject(Component.RentService) rentService: RentService,
  ) {
    super(logger);

    this.show = this.show.bind(this);
    this.create = this.create.bind(this);

    logger.info('Registering routes for comment');

    this.addRoute({
      path: '/:rentId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('rentId'),
        new DocumentExistsMidleware(rentService, 'rentId', 'Rent')
      ],
    });
    this.addRoute({
      path: '/:rentId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateObjectIdMiddleware('rentId'),
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMidleware(rentService, 'rentId', 'Rent'),
        new DocumentExistsMidleware(userService, 'userId', 'User'),
      ],
    });
  }

  public async show({params}: Request<ParamsRentId>, res: Response): Promise<void> {
    const comments = await this.commentService.findNew(params.rentId, DEFAULT_COMMENT_COUNT);
    const resData = fillDTO(CommentRdo, comments);
    this.ok(res, resData);
  }

  public async create({params, body}: Request<ParamsRentId, Record<string, unknown>, CreateCommentDto>, res: Response): Promise<void> {
    const comment = await this.commentService.create({...body, rentId: params.rentId});
    const resData = fillDTO(CommentRdo, comment);
    this.created(res, resData);
  }
}
