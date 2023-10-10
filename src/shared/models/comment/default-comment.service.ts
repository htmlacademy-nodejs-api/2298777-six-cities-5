import { inject, injectable } from 'inversify';
import { CommentEntity, CommentModel, CommentService, CreateCommentDto } from './index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType } from '@typegoose/typegoose';

@injectable()
export class DefaultCommentService implements CommentService {

  public constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: typeof CommentModel,
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);

    this.logger.info(`New comment created with id ${result.id}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel.findById(id).exec();
  }
}
