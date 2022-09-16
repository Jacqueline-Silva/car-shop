import { IMotorcycle } from "../../interfaces/IMotorcycle";


const idMotorcyclesMock = '73cf1fc6498565d94eba52cd';

const motorcyclesMock: IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "black",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
};

const motorcyclesMockWithID: IMotorcycle & {_id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "black",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
};

const newMotorcyclesMock: IMotorcycle = {
  model: "Neiman Marcus Fighter",
  year: 2008,
  color: "silver",
  buyValue: 55000000,
  category: "Custom",
  engineCapacity: 1966
};

const newMotorcyclesMockWithID: IMotorcycle & {_id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Neiman Marcus Fighter",
  year: 2008,
  color: "silver",
  buyValue: 55000000,
  category: "Custom",
  engineCapacity: 1966
};


export {
  idMotorcyclesMock,
  motorcyclesMock,
  motorcyclesMockWithID,
  newMotorcyclesMock,
  newMotorcyclesMockWithID,
}