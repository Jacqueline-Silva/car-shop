import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarsController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request & { body: ICar }, res: Response<ICar>) {
    const car = req.body;
    const results = await this._service.create(car);
    return res.status(201).json(results);
  }
}