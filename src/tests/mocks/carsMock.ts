import { ICar } from "../../interfaces/ICar";

const idCarsMock = '73cf1fc6498565d94eba52cd';

const carsMock: ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const carsMockWithID: ICar & {_id: string } = {
  _id: '73cf1fc6498565d94eba52cd',
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const newCarsMock: ICar = {
  model: "Caoa Chery ICar",
  year: 2022,
  color: "white",
  buyValue: 14999000,
  seatsQty: 2,
  doorsQty: 3
};

const newCarsMockWithID: ICar & {_id: string } = {
  _id: '73cf1fc6498565d94eba52cd',
  model: "Caoa Chery ICar",
  year: 2022,
  color: "white",
  buyValue: 14999000,
  seatsQty: 2,
  doorsQty: 3
};


export {
  idCarsMock,
  carsMock,
  carsMockWithID,
  newCarsMock,
  newCarsMockWithID,
}