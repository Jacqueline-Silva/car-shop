import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carsMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false }); // Desabilitando o controle de versão

export default class CarsModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Cars', carsMongooseSchema)) {
    super(model);
  }
}

/**
 * REF: https://mongoosejs.com/docs/guide.html#versionKey
 */