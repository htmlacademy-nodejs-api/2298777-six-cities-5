import { inject, injectable } from 'inversify';
import { AbstractController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';
import { Request, Response } from 'express';
import { ParamsRentId, RentService } from '../rent/index.js';
import { CommentRdo, CommentService, CreateCommentDto, DEFAULT_COMMENT_COUNT } from './index.js';
import { fillDTO } from '../../helpers/common.js';
import { ValidateObjectIdMiddleware } from '../../libs/rest/middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../libs/rest/middleware/validate-dto.middleware.js';
import { DocumentExistsMidleware } from '../../libs/rest/middleware/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../libs/rest/middleware/private-route.middleware.js';

@injectable()
export class CommentController extends AbstractController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
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
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('rentId'),
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMidleware(rentService, 'rentId', 'Rent'),
      ],
    });
  }

  public async show({params}: Request<ParamsRentId>, res: Response): Promise<void> {
    const comments = await this.commentService.findNew(params.rentId, DEFAULT_COMMENT_COUNT);
    const resData = fillDTO(CommentRdo, comments);
    this.ok(res, resData);
  }

  public async create({params, body, tokenPayload}: Request<ParamsRentId, Record<string, unknown>, CreateCommentDto>, res: Response): Promise<void> {
    const comment = await this.commentService.create({...body, rentId: params.rentId, userId: tokenPayload.id});
    const resData = fillDTO(CommentRdo, comment);
    this.created(res, resData);
  }
}
