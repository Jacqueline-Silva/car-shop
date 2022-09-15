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

  public async read(_req: Request, res: Response) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    const result = await this._service.readOne(id);
    return res.status(200).json(result);
  }

  public async update(req: Request & { body: ICar }, res: Response) {
    const { id } = req.params;
    const car = req.body;
    const results = await this._service.update(id, car);
    return res.status(200).json(results);
  }
}