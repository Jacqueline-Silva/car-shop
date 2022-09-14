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

export {
  idCarsMock,
  carsMock,
  carsMockWithID
}