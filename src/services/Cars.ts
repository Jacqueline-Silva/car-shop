import IService from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { ErrorTypes } from '../errors/catalog';

export default class CarsService implements IService<ICar> {
  private _car:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:ICar):Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(obj);
  }

  public async read():Promise<ICar[]> {
    const cars = await this._car.read();
    return cars;
  }

  public async readOne(id:string):Promise<ICar> {
    const carID = await this._car.readOne(id);
    if (!carID) throw new Error(ErrorTypes.EntityNotFound);
    return carID;
  }
}
