import { inject, injectable } from 'inversify';
import { CreateRentDto, RentEntity, RentModel, RentService, UpdateRentDto } from './index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType } from '@typegoose/typegoose';
import { Sort, Component } from '../../types/index.js';

@injectable()
export class DefaultRentService implements RentService {

  public constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.RentModel) private readonly rentModel: typeof RentModel,
  ) {}

  public async create(dto: CreateRentDto): Promise<DocumentType<RentEntity>> {
    const result = await this.rentModel.create(dto);

    this.logger.info(`New rent created with id ${result.id}`);

    return result;
  }

  public async findById(rentId: string): Promise<DocumentType<RentEntity> | null> {
    return this.rentModel.findById(rentId)
      .populate(['userId', 'commentsIds'])
      .exec();
  }

  public async find(): Promise<DocumentType<RentEntity>[]> {
    return this.rentModel.find().populate(['userId', 'commentsIds']).exec();
  }

  public async deleteById(rentId: string): Promise<DocumentType<RentEntity> | null> {
    return this.rentModel.findOneAndDelete({id: rentId}).exec();
  }

  public async updateById(rentId: string, dto: UpdateRentDto): Promise<DocumentType<RentEntity> | null> {
    return this.rentModel.findOneAndUpdate({id: rentId}, dto).exec();
  }

  public async exists(rentId: string): Promise<boolean> {
    return this.rentModel.exists({id: rentId}).exec() !== null;
  }

  public async findNew(count: number): Promise<DocumentType<RentEntity>[]> {
    return this.rentModel
      .find()
      .sort({ createdAt: Sort.Down})
      .limit(count)
      .populate(['userId, commentsIds'])
      .exec();
  }

  public async findDiscussed(count: number): Promise<DocumentType<RentEntity>[]> {
    return this.rentModel
      .find()
      .sort({commentsCount: Sort.Down})
      .limit(count)
      .populate(['userId, commentsIds'])
      .exec();
  }
}
