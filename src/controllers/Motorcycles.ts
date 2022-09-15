import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

export default class MotorcyclesController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(req: Request & { body: IMotorcycle }, res: Response<IMotorcycle>) {
    const data = req.body;
    const motorcycle = await this._service.create(data);
    return res.status(201).json(motorcycle);
  }
}