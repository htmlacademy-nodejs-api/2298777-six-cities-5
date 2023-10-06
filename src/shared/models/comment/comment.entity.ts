import { Comment, User } from '../../types/index.js';

export class CommentEntity implements Comment {
  comment: string;
  date: string | Date;
  rating: number;
  author: User;
}
