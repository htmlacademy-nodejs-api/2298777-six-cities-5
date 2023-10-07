import { User } from '../../../types/index.js';

export class CreateCommentDto {
  comment: string;
  date: Date | string;
  rating: number;
  author: User;
}
