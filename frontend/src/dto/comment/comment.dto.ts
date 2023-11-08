import UserDto from '../user/user.dto';

export default class CommentDto {
  public id!: string;

  public comment!: string;

  public rating!: number;

  public user!: UserDto;

  public date!: string;
}
