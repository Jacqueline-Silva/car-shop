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

  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const motorcycles = await this._service.read();
    return res.status(200).json(motorcycles);
  }

  public async readOne(req: Request, res: Response<IMotorcycle>) {
    const { id } = req.params;
    const motorcycleID = await this._service.readOne(id);
    return res.status(200).json(motorcycleID);
  }

  public async update(req: Request & { body: IMotorcycle }, res: Response<IMotorcycle>) {
    const { id } = req.params;
    const data = req.body;
    const updateMotorcycle = await this._service.update(id, data);
    return res.status(200).json(updateMotorcycle);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.delete(id);
    return res.sendStatus(204);
  }
}