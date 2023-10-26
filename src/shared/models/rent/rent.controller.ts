import { inject, injectable } from 'inversify';
import { AbstractController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { Request, Response } from 'express';
import { CreateRentDto, RentService } from './index.js';
import { fillDTO } from '../../helpers/common.js';
import { RentRdo } from './rdo/rent.rdo.js';
import { StatusCodes } from 'http-status-codes';

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

  public async getDetailed({path}: Request<Record<string, unknown>, Record<string, unknown>, CreateRentDto>, res: Response): Promise<void> {
    if (!(await this.rentService.exists(path.slice(1)))) {
      const error = new Error('Rent not found');
      this.send(res, StatusCodes.NOT_FOUND, { error: error.message});
      return this.logger.error(error.message, error);
    }
    const rent = await this.rentService.findById(path.slice(1));
    const resData = fillDTO(RentRdo, rent);
    this.ok(res, resData);
  }

  public async update({body, path}: Request<Record<string, unknown>, Record<string, unknown>, CreateRentDto>, res: Response): Promise<void> {
    if (!(await this.rentService.exists(path.slice(1)))) {
      const error = new Error('Rent not found');
      this.send(res, StatusCodes.NOT_FOUND, { error: error.message});
      return this.logger.error(error.message, error);
    }
    const rent = this.rentService.updateById(path.slice(1), body);
    const resData = fillDTO(RentRdo, rent);
    this.ok(res, resData);
  }

  public async delete({path}: Request<Record<string, unknown>, Record<string, unknown>, CreateRentDto>, res: Response): Promise<void> {
    if (!(await this.rentService.exists(path.slice(1)))) {
      const error = new Error('Rent not found');
      this.send(res, StatusCodes.NOT_FOUND, { error: error.message});
      return this.logger.error(error.message, error);
    }
    this.rentService.deleteById(path.slice(1));
    this.ok(res, StatusCodes.NO_CONTENT);
  }
}
