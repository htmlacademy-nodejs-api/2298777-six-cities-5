import { inject, injectable } from 'inversify';
import { CreateRentDto,
  RentEntity,
  RentModel,
  RentService,
  UpdateRentDto,
  DEFAULT_RENT_COUNT } from './index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType } from '@typegoose/typegoose';
import { Sort, Component } from '../../types/index.js';
import { UserModel } from '../user/index.js';

@injectable()
export class DefaultRentService implements RentService {

  public constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.RentModel) private readonly rentModel: typeof RentModel,
    @inject(Component.UserModel) private readonly userModel: typeof UserModel,
  ) {}

  public async create(dto: CreateRentDto): Promise<DocumentType<RentEntity>> {
    const user = await this.userModel.findById(dto.userId);
    if (!user) {
      throw new Error(`User with id ${dto.userId} not found`);
    }
    const result = await (await this.rentModel.create(dto)).populate(['userId']);

    this.logger.info(`New rent created with id ${result.id}`);

    return result;
  }

  public async findById(rentId: string): Promise<DocumentType<RentEntity> | null> {
    return this.rentModel
      .findById(rentId)
      .select('+description +images +goods +bedrooms +maxAdults')
      .populate(['userId'])
      .exec();
  }

  public async find(): Promise<DocumentType<RentEntity>[]> {
    return this.rentModel.find().limit(DEFAULT_RENT_COUNT).exec();
  }

  public async deleteById(rentId: string): Promise<DocumentType<RentEntity> | null> {
    return this.rentModel.findByIdAndDelete(rentId).exec();
  }

  public async updateById(rentId: string, dto: UpdateRentDto): Promise<DocumentType<RentEntity> | null> {
    return this.rentModel
      .findByIdAndUpdate(rentId, dto, {new: true})
      .select('+description +images +goods +bedrooms +maxAdults')
      .populate(['userId'])
      .exec();
  }

  public async exists(id: string): Promise<boolean> {
    return (await this.rentModel
      .exists({_id: id})) !== null;
  }

  public async findNew(count: number): Promise<DocumentType<RentEntity>[]> {
    return this.rentModel
      .find()
      .select('-userId')
      .sort({ createdAt: Sort.Down})
      .limit(count)
      .exec();
  }

  public async findDiscussed(count: number): Promise<DocumentType<RentEntity>[]> {
    return this.rentModel
      .find()
      .sort({commentsCount: Sort.Down})
      .limit(count)
      .populate(['userId'])
      .exec();
  }

  public async findPremium(city: string, count: number): Promise<DocumentType<RentEntity>[]> {
    return this.rentModel
      .find({city, isPremium: true})
      .limit(count)
      .exec();
  }

  public async findFavorite(userId: string): Promise<DocumentType<RentEntity>[] | null> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      return null;
    }

    const favoritesIds = user.favoriteRentsIds;

    if (!favoritesIds || !favoritesIds.length) {
      return [];
    }

    return this.rentModel
      .find({ _id: { $in: favoritesIds}})
      .populate(['userId'])
      .exec();
  }

  public async findByCity(city: string, count: number): Promise<DocumentType<RentEntity>[]> {
    return this.rentModel
      .find({city})
      .limit(count)
      .populate(['userId'])
      .exec();
  }
}
