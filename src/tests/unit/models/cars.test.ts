import * as sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import CarsModel from '../../../models/CarsModel';
import { carsMock, carsMockWithID } from '../../mocks/carsMock';

describe('Cars Model', () => {
  const carsModel = new CarsModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carsMockWithID);
  });

  after(() => {
    sinon.restore();
  });

  describe('Verifica a função "create"', () => {
    it('Sucesso ao cadastrar um novo carro', async () => {
      const newCars = await carsModel.create(carsMock);
      
      expect(newCars).to.be.deep.equal(carsMockWithID);
    });
  });
});