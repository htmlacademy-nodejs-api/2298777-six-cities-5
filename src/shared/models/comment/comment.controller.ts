import { inject, injectable } from 'inversify';
import { AbstractController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';
import { Request, Response } from 'express';
import { ParamsRentId } from '../rent/index.js';
import { CommentRdo, CommentService, CreateCommentDto, DEFAULT_COMMENT_COUNT } from './index.js';
import { fillDTO } from '../../helpers/common.js';

@injectable()
export class CommentController extends AbstractController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);

    this.get = this.get.bind(this);
    this.create = this.create.bind(this);

    logger.info('Registering routes for comment');

    this.addRoute({path: '/:rentId', method: HttpMethod.Get, handler: this.get});
    this.addRoute({path: '/:rentId', method: HttpMethod.Post, handler: this.create});
  }

  public async get({params}: Request<ParamsRentId>, res: Response): Promise<void> {
    const comments = await this.commentService.findNew(params.rentId, DEFAULT_COMMENT_COUNT);
    const resData = fillDTO(CommentRdo, comments);
    this.ok(res, resData);
  }

  public create({params, body}: Request<ParamsRentId, Record<string, unknown>, CreateCommentDto>, res: Response): void {
    const comment = this.commentService.create({...body, rentId: params.rentId});
    const resData = fillDTO(CommentRdo, comment);
    this.created(res, resData);
  }
}
