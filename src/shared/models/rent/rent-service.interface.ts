import { DocumentType } from '@typegoose/typegoose';
import { RentEntity } from './rent.entity.js';
import { CreateRentDto, UpdateRentDto } from './index.js';

export interface RentService {
  create(dto: CreateRentDto): Promise<DocumentType<RentEntity>>;
  findById(rentId: string): Promise<DocumentType<RentEntity> | null>;
  find(): Promise<DocumentType<RentEntity>[]>;
  deleteById(rentId: string): Promise<DocumentType<RentEntity> | null>;
  updateById(rentId: string, dto: UpdateRentDto): Promise<DocumentType<RentEntity> | null>;
  exists(id: string): Promise<boolean>;
  findNew(count: number): Promise<DocumentType<RentEntity>[]>;
  findDiscussed(count: number): Promise<DocumentType<RentEntity>[]>;
  findPremium(city: string, count: number): Promise<DocumentType<RentEntity>[]>;
  findFavorite(userId: string): Promise<DocumentType<RentEntity>[] | null>;
  findByCity(city: string, count: number): Promise<DocumentType<RentEntity>[]>;
}
