import { inject, injectable } from 'inversify';
import { AbstractController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { City, Component } from '../../types/index.js';
import { Request, Response } from 'express';
import { CreateRentDto,
  DEFAULT_RENT_COUNT,
  DEFFAULT_RENT_PREMIUM_COUNT,
  RentEntity,
  RentService,
  UpdateRentDto } from './index.js';
import { fillDTO, makeCapitalized } from '../../helpers/index.js';
import { RentRdo } from './rdo/rent.rdo.js';
import { ParamsRentId } from './index.js';
import { QueryRent } from './type/query-rent.type.js';
import { ValidateObjectIdMiddleware } from '../../libs/rest/middleware/index.js';
import { ValidateDtoMiddleware } from '../../libs/rest/middleware/index.js';
import { DocumentExistsMidleware } from '../../libs/rest/middleware/index.js';
import { PrivateRouteMiddleware } from '../../libs/rest/middleware/index.js';
import { UserService } from '../user/index.js';
import { StatusCodes } from 'http-status-codes';
import { DocumentType } from '@typegoose/typegoose';
import { TokenPayload } from '../auth/index.js';

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
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateRentDto),
      ]
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.getPremium,
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
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('rentId'),
        new ValidateDtoMiddleware(UpdateRentDto),
        new DocumentExistsMidleware(rentService, 'rentId', 'Rent'),
      ]
    });
    this.addRoute({
      path: '/:rentId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('rentId'),
        new DocumentExistsMidleware(rentService, 'rentId', 'Rent')
      ]
    });
    this.addRoute({
      path: '/:rentId/favorite',
      method: HttpMethod.Patch,
      handler: this.changeFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('rentId'),
        new DocumentExistsMidleware(rentService, 'rentId', 'Rent')
      ]
    });
  }

  public async index({tokenPayload, query}: Request<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, QueryRent>, res: Response): Promise<void> {
    if (query.count && query.count < 1) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Count must be greater than 0', 'rent controller');
    }
    const rents = await this.rentService.findNew(query.count || DEFAULT_RENT_COUNT);
    this.sendWarningOrOk(tokenPayload, rents, res);
  }

  public async create({tokenPayload, body}: Request<Record<string, unknown>, Record<string, unknown>, CreateRentDto>, res: Response): Promise<void> {
    const rent = await this.rentService.create({...body, userId: tokenPayload.id});
    const resData = fillDTO(RentRdo, rent);
    this.created(res, resData);
  }

  public async show({params, tokenPayload}: Request<ParamsRentId>, res: Response): Promise<void> {
    const rent = await this.rentService.findById(params.rentId);
    if (tokenPayload && tokenPayload.id) {
      if (!await(this.userService.exists(tokenPayload.id))) {
        this.logger.warn(`User with id ${tokenPayload.id} not found`);
        return this.send(res.set('Warning', 'Token is invalid'), StatusCodes.OK, fillDTO(RentRdo, rent));
      }
      rent!.isFavorite = await this.userService.isRentInFavorite(tokenPayload.id, rent!.id);
    }
    const resData = fillDTO(RentRdo, rent);
    this.ok(res, resData);
  }

  public async update({body, params, tokenPayload}: Request<ParamsRentId, Record<string, unknown>, CreateRentDto>, res: Response): Promise<void> {
    const rentForCheck = await this.rentService.findById(params.rentId);
    if (tokenPayload && !rentForCheck?.userId.equals(tokenPayload.id)) {
      throw new HttpError(StatusCodes.FORBIDDEN, 'Forbidden', 'rent controller');
    }
    const rent = await this.rentService.updateById(params.rentId, body);
    const resData = fillDTO(RentRdo, rent);
    this.ok(res, resData);
  }

  public async delete({params, tokenPayload}: Request<ParamsRentId>, res: Response): Promise<void> {
    const rentForCheck = await this.rentService.findById(params.rentId);
    if (tokenPayload && !rentForCheck?.userId.equals(tokenPayload.id)) {
      throw new HttpError(StatusCodes.FORBIDDEN, 'Forbidden', 'rent controller');
    }
    this.rentService.deleteById(params.rentId);
    this.noContent(res, {});
  }

  public async changeFavorite({tokenPayload, params}: Request<ParamsRentId>, res: Response): Promise<void> {
    const isFavorite = await this.userService.isRentInFavorite(tokenPayload.id, params.rentId);
    const rent = await this.userService.updateFavorite(tokenPayload.id, params.rentId, isFavorite ? 'delete' : 'add');
    const resData = fillDTO(RentRdo, rent);
    this.ok(res, resData);
  }

  public async getPremium({query, tokenPayload}: Request<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, QueryRent>, res: Response): Promise<void> {
    if (!query.city) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'City is required', 'rent controller');
    }
    if (!Object.values(City).includes(makeCapitalized(query.city) as City)) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'City is invalid', 'rent controller');
    }

    const rents = await this.rentService.findPremium(makeCapitalized(query.city), DEFFAULT_RENT_PREMIUM_COUNT);
    this.sendWarningOrOk(tokenPayload, rents, res);
  }

  public async getFavorites({tokenPayload}: Request<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, QueryRent>, res: Response): Promise<void> {
    const rents = await this.rentService.findFavorite(tokenPayload.id);
    rents!.forEach((rent) => {
      rent.isFavorite = true;
    });
    const resData = fillDTO(RentRdo, rents);
    this.ok(res, resData);
  }

  private async sendWarningOrOk(tokenPayload: TokenPayload, rents: DocumentType<RentEntity>[], res: Response): Promise<void> {
    if (tokenPayload && tokenPayload.id) {
      if (!await(this.userService.exists(tokenPayload.id))) {
        this.logger.warn(`User with id ${tokenPayload.id} not found`);
        return this.send(res.set('Warning', 'Token is invalid'), StatusCodes.OK, fillDTO(RentRdo, rents));
      }
      for (const rent of rents) {
        rent.isFavorite = await this.userService.isRentInFavorite(tokenPayload.id, rent.id);
      }
    }
    this.ok(res, fillDTO(RentRdo, rents));
  }
}
