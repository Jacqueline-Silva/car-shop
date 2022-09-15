import IService from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, motorcycleZodSchema } from '../interfaces/IMotorcycle';
import { ErrorTypes } from '../errors/catalog';

export default class MotorcyclesService implements IService<IMotorcycle> {
  private _motorcycle:IModel<IMotorcycle>;

  constructor(model:IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj:IMotorcycle):Promise<IMotorcycle> {
    const parsed = motorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._motorcycle.create(obj);
  }

  public async read():Promise<IMotorcycle[]> {
    const motorcycles = await this._motorcycle.read();
    return motorcycles;
  }

  public async readOne(id:string):Promise<IMotorcycle> {
    const motorcycleID = await this._motorcycle.readOne(id);
    if (!motorcycleID) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycleID;
  }
}
