import { inject, injectable } from 'inversify';
import { AbstractController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { Request, Response } from 'express';
import { CreateRentDto, RentService } from './index.js';
import { fillDTO } from '../../helpers/common.js';
import { RentRdo } from './rdo/rent.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../../libs/rest/index.js';
import { ParamsRentId } from './index.js';

@injectable()
export class RentController extends AbstractController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.RentService) private readonly rentService: RentService,
  ) {
    super(logger);

    logger.info('Registering routes for rents');

    this.getList = this.getList.bind(this);
    this.create = this.create.bind(this);
    this.getDetailed = this.getDetailed.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.getList});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:rentId', method: HttpMethod.Get, handler: this.getDetailed});
    this.addRoute({path: '/:rentId', method: HttpMethod.Patch, handler: this.update});
    this.addRoute({path: '/:rentId', method: HttpMethod.Delete, handler: this.delete});
  }

  public async getList(_req: Request, res: Response): Promise<void> {
    const rents = await this.rentService.find();
    const resData = fillDTO(RentRdo, rents);
    this.ok(res, resData);
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateRentDto>, res: Response): Promise<void> {
    const rent = await this.rentService.create(body);
    const resData = fillDTO(RentRdo, rent);
    this.created(res, resData);
  }

  public async getDetailed({params}: Request<ParamsRentId>, res: Response): Promise<void> {
    const rentId = params.rentId;
    const rent = await this.rentService.findById(rentId);
    if (!rent) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Rent with id ${rentId} not found.`, 'rent controller');
    }
    const resData = fillDTO(RentRdo, rent);
    this.ok(res, resData);
  }

  public async update({body, params}: Request<ParamsRentId, Record<string, unknown>, CreateRentDto>, res: Response): Promise<void> {
    const rentId = params.rentId;
    if (!(await this.rentService.exists(rentId))) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Rent with id ${rentId} not found.`, 'rent controller');
    }
    const rent = this.rentService.updateById(rentId, body);
    const resData = fillDTO(RentRdo, rent);
    this.ok(res, resData);
  }

  public async delete({params}: Request<ParamsRentId>, res: Response): Promise<void> {
    const rentId = params.rentId;
    if (!(await this.rentService.exists(rentId))) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Rent with id ${rentId} not found.`, 'rent controller');
    }
    this.rentService.deleteById(rentId);
    this.noContent(res, {});
  }
}
