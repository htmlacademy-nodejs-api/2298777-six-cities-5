import { Expose } from 'class-transformer';

export class LoginRdo {
  @Expose()
  public token: string;

  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public avatar: string;

  @Expose()
  public isPro: boolean;
}
