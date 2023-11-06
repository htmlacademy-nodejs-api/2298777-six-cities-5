import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto, UserEntity, UserModel, UserService, UpdateUserDto, Action } from './index.js';
import { inject, injectable } from 'inversify';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { Types } from 'mongoose';
import { DEFAULT_AVATAR } from '../../libs/rest/static.const.js';

@injectable()
export class DefaultUserService implements UserService {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: typeof UserModel,
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);

    user.setPassword(dto.password, salt);
    user.setAvatar(DEFAULT_AVATAR);

    const result = await this.userModel.create(user);

    this.logger.info(`New user created ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email: email}).exec();
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const result = await this.userModel.findOne({email: dto.email}).exec();

    if (result) {
      return result;
    }

    return this.create(dto, salt);
  }

  public async updateById(id: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(id, dto, {new: true}).exec();
  }

  public async updateFavorite(id: string, rentId: string, action: typeof Action[keyof typeof Action]): Promise<DocumentType<UserEntity> | null> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      return null;
    }

    const favorites = user.favoriteRentsIds;
    const toCheck = new Types.ObjectId(rentId);
    const index = favorites.indexOf(toCheck);

    this.logger.info(`User ${user.id} changed favorite status for rent ${rentId}`);

    if (action === 'add' && index === -1) {
      favorites.push(toCheck);
    } else if (action === 'delete' && index !== -1) {
      favorites.splice(index, 1);
    } else {
      return null;
    }

    return await this.userModel.findByIdAndUpdate(id, {favoriteRentsIds: favorites}, {new: true}).exec();
  }

  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(id).exec();
  }

  public async exists(id: string): Promise<boolean> {
    return (await this.userModel
      .exists({_id: id})) !== null;
  }

  public async isRentInFavorite(userId: string, rentId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId).exec();
    return user?.favoriteRentsIds.includes(new Types.ObjectId(rentId)) ?? false;
  }
}
