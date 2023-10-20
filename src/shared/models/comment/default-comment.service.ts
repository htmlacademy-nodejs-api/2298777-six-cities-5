import { inject, injectable } from 'inversify';
import { CommentEntity, CommentModel, CommentService, CreateCommentDto } from './index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType } from '@typegoose/typegoose';
import { RentModel } from '../rent/index.js';

@injectable()
export class DefaultCommentService implements CommentService {

  public constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: typeof CommentModel,
    @inject(Component.RentModel) private readonly rentModel: typeof RentModel,
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);
    const rent = await this.rentModel.findById(dto.rentId).exec();

    await rent?.updateOne({$inc: {commentsCount: 1}}, {new: true}).exec();

    const newRating = await this.calculateRating(dto.rentId);

    await rent?.updateOne({rating: newRating}, {new: true}).exec();

    this.logger.info(`New comment created with id ${result.id}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel
      .findById(id)
      .populate(['userId'])
      .exec();
  }

  public async deleteById(id: string): Promise<DocumentType<CommentEntity> | null> {
    const comment = await this.commentModel.findById(id).exec();

    if (!comment) {
      return null;
    }

    const rent = await this.rentModel.findById(comment.rentId).exec();

    await rent?.updateOne({$inc: {commentsCount: -1}}, {new: true});

    const newRating = this.calculateRating(rent?.id);

    await rent?.updateOne({rating: newRating}, {new: true});

    await comment.deleteOne();

    return comment;
  }

  public async findByRentId(rentId: string, limit: number): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({rentId: rentId})
      .limit(limit)
      .populate(['userId'])
      .exec();
  }

  public async calculateRating(rentId: string): Promise<number | null> {
    const comments = await this.commentModel.find({rentId}).exec();
    let rating = 0;

    if (comments.length === 0) {
      return null;
    } else {
      const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
      rating = totalRating / comments.length;
    }

    return rating;
  }
}
