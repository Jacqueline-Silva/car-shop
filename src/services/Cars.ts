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

  public async update(id: string, obj: ICar):Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const upCar = await this._car.update(id, obj);
    if (!upCar) throw new Error(ErrorTypes.EntityNotFound);
    return upCar;
  }

  public async delete(id:string):Promise<ICar> {
    const car = await this._car.delete(id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }
}
