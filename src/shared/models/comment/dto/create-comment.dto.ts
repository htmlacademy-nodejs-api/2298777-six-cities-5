export class CreateCommentDto {
  comment: string;
  date: Date | string;
  rating: number;
  authorId: string;
}
