import { inject, injectable } from 'inversify';
import { AbstractController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { Request, Response } from 'express';
import { CreateRentDto, DEFAULT_RENT_COUNT, DEFFAULT_RENT_PREMIUM_COUNT, RentEntity, RentService, UpdateRentDto } from './index.js';
import { fillDTO } from '../../helpers/common.js';
import { RentRdo } from './rdo/rent.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../../libs/rest/index.js';
import { ParamsRentId } from './index.js';
import { QueryRent } from './type/query-rent.type.js';
import { DocumentType } from '@typegoose/typegoose';
import { ValidateObjectIdMiddleware } from '../../middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../middleware/validate-dto.middleware.js';
import { UserService } from '../user/index.js';
import { DocumentExistsMidleware } from '../../middleware/document-exists.middleware.js';

@injectable()
export class RentController extends AbstractController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.RentService) private readonly rentService: RentService,
    @inject(Component.UserService) private readonly userService: UserService,
  ) {
    super(logger);

    logger.info('Registering routes for rents');

    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.show = this.show.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateRentDto),
      ]
    });
    this.addRoute({
      path: '/:rentId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('rentId'),
        new DocumentExistsMidleware(rentService, 'rentId', 'Rent')
      ]
    });
    this.addRoute({
      path: '/:rentId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('rentId'),
        new DocumentExistsMidleware(rentService, 'rentId', 'Rent'),
        new ValidateDtoMiddleware(UpdateRentDto)
      ]
    });
    this.addRoute({
      path: '/:rentId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('rentId'),
        new DocumentExistsMidleware(rentService, 'rentId', 'Rent')
      ]
    });
  }

  public async index({query}: Request<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, QueryRent>, res: Response): Promise<void> {
    let rents: DocumentType<RentEntity>[];
    if (query.favorite === 'true' && !query.city && !query.premium) {
      throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', 'rent controller');
    } else if (query.city && query.premium === 'true' && !query.favorite) {
      rents = await this.rentService.findPremium(query.city, DEFFAULT_RENT_PREMIUM_COUNT);
    } else {
      rents = await this.rentService.findNew(DEFAULT_RENT_COUNT);
    }
    const resData = fillDTO(RentRdo, rents);
    this.ok(res, resData);
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateRentDto>, res: Response): Promise<void> {
    if (!(await this.userService.exists(body.userId))) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'User not found', 'rent controller');
    }
    const rent = await this.rentService.create(body);
    const resData = fillDTO(RentRdo, rent);
    this.created(res, resData);
  }

  public async show({params}: Request<ParamsRentId>, res: Response): Promise<void> {
    const rent = await this.rentService.findById(params.rentId);
    const resData = fillDTO(RentRdo, rent);
    this.ok(res, resData);
  }

  public async update({body, params}: Request<ParamsRentId, Record<string, unknown>, CreateRentDto>, res: Response): Promise<void> {
    const rent = this.rentService.updateById(params.rentId, body);
    const resData = fillDTO(RentRdo, rent);
    this.ok(res, resData);
  }

  public async delete({params}: Request<ParamsRentId>, res: Response): Promise<void> {
    this.rentService.deleteById(params.rentId);
    this.noContent(res, {});
  }
}
