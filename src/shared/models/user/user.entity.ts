import { RentEntity } from '../rent/rent.entity.js';
import { defaultClasses, getModelForClass, prop, modelOptions, Ref } from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/index.js';
import { User } from '../../types/entities.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}


@modelOptions({schemaOptions: {
  collection: 'users',
}})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps{
  @prop({required: true, minlength: 1, maxlength: 15})
  public name: string;

  @prop({unique: true, required: true, match: [/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/,'Email is incorrect']})
  public email: string;

  @prop({required: false, default: ''})
  private avatar?: string;

  @prop({required: true, default: ''})
  private password?: string;

  @prop({required: true, default: false})
  public isPro: boolean;

  @prop({required: false, ref: () => RentEntity})
  public readonly favoriteRentsIds: Ref<() => RentEntity>[];

  constructor(data: Omit<User, 'avatar'>) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.isPro = data.isPro;
  }

  public setPassword(line: string, salt: string) {
    this.password = createSHA256(line, salt);
  }

  public getPassword() {
    return this.password;
  }

  public async comparePassword(line: string, salt: string) {
    const hashPassword = createSHA256(line, salt);
    return hashPassword === this.password;
  }

  public getAvatar() {
    return this.avatar;
  }

  public setAvatar(avatar: string) {
    this.avatar = avatar;
  }
}

export const UserModel = getModelForClass(UserEntity);
