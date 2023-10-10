import { inject, injectable } from 'inversify';
import { CreateRentDto, RentEntity, RentModel, RentService } from './index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType } from '@typegoose/typegoose';

@injectable()
export class DefaultRentService implements RentService {

  public constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.RentModel) private readonly rentModel: typeof RentModel,
  ) {}

  public async create(dto: CreateRentDto): Promise<DocumentType<RentEntity>> {
    const result = await this.rentModel.create(dto);

    this.logger.info(`New rent created with id ${result.id}`);

    return result;
  }

  public async findById(rentId: string): Promise<DocumentType<RentEntity> | null> {
    return this.rentModel.findById(rentId).exec();
  }
}
