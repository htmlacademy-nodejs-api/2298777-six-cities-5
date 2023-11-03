import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { Action, CreateUserDto, UpdateUserDto } from './index.js';

export interface UserService {
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(id: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
  findById(id: string): Promise<DocumentType<UserEntity> | null>;
  exists(id: string): Promise<boolean>;
  isRentInFavorite(userId: string, rentId: string): Promise<boolean>;
  updateFavorite(id: string, rentId: string, action: typeof Action[keyof typeof Action]): Promise<DocumentType<UserEntity> | null>;
}
