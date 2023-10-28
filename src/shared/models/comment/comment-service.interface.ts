import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './index.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findById(id: string): Promise<DocumentType<CommentEntity> | null>;
  findByRentId(rentId: string, limit: number): Promise<DocumentType<CommentEntity>[]>;
  findNew(rentId: string, limit: number): Promise<DocumentType<CommentEntity>[]>;
}
