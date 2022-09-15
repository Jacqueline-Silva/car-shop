import * as sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import CarsModel from '../../../models/CarsModel';
import { carsMock, carsMockWithID, idCarsMock } from '../../mocks/carsMock';

describe('Cars Model', () => {
  const carsModel = new CarsModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carsMockWithID);
    sinon.stub(Model, 'find').resolves([carsMockWithID]);
    sinon.stub(Model, 'findOne').resolves(carsMockWithID);
  });

  after(() => {
    sinon.restore();
  });

  describe('Verifica o método "create"', () => {
    it('Sucesso ao cadastrar um novo carro', async () => {
      const newCars = await carsModel.create(carsMock);
      
      expect(newCars).to.be.deep.equal(carsMockWithID);
    });
  });

  describe('Verifica o método "read"', () => {
    it('Sucesso ao exibir a lista de carros cadastrados', async () => {
      const allLens = await carsModel.read();

      expect(allLens).to.be.deep.equal([carsMockWithID]);
    });
  });

  describe('Verifica a função "readOne"', () => {
    it('Sucesso ao procurar o carro pelo ID', async () => {
      const carFound = await carsModel.readOne(idCarsMock);

      expect(carFound).to.be.deep.equal(carsMockWithID);
    });

    it('Falha ao procurar o carro pelo ID', async () => {
      try {
				await carsModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
    });
  });
});