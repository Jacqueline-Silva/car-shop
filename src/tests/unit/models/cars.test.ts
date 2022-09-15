import * as sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import CarsModel from '../../../models/CarsModel';
import { carsMock, carsMockWithID, idCarsMock, newCarsMock, newCarsMockWithID } from '../../mocks/carsMock';

describe('Cars Model', () => {
  const carsModel = new CarsModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carsMockWithID);
    sinon.stub(Model, 'find').resolves([carsMockWithID]);
    sinon.stub(Model, 'findOne').resolves(carsMockWithID);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(newCarsMockWithID);
    sinon.stub(Model, 'findByIdAndDelete').resolves(newCarsMockWithID);
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
      const cars = await carsModel.read();

      expect(cars).to.be.deep.equal([carsMockWithID]);
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

  describe('Verifica o método "update"', () => {
    it('Sucesso ao atualizar os dados do carro', async () => {
      const updateCar = await carsModel.update(idCarsMock, newCarsMock);

      expect(updateCar).to.be.deep.equal(newCarsMockWithID);
    });

    it('Falha ao atualizar os dados do carro', async () => {
      try {
				await carsModel.update('idIncorreto', newCarsMock);
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
    });
  });

  describe('Verifica o método "delete"', () => {
    it('Sucesso ao deletar o carro pelo ID', async () => {
      const deleteCar = await carsModel.delete(idCarsMock);

      expect(deleteCar).to.be.deep.equal(newCarsMockWithID);
    });

    it('Falha ao deletar o carro pelo ID', async () => {
      try {
				await carsModel.delete('idIncorreto');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
    });
  });
});