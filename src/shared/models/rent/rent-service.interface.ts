import { DocumentType } from '@typegoose/typegoose';
import { RentEntity } from './rent.entity.js';
import { CreateRentDto } from './index.js';

export interface RentService {
  create(dto: CreateRentDto): Promise<DocumentType<RentEntity>>;
  findById(rentId: string) : Promise<DocumentType<RentEntity> | null>;
}
