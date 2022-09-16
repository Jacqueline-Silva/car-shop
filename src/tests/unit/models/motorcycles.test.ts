import * as sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import MotorcyclesModel from '../../../models/MotorcyclesModel';
import { idMotorcyclesMock, motorcyclesMock, motorcyclesMockWithID, newMotorcyclesMock, newMotorcyclesMockWithID } from '../../mocks/motorcyclesMock';

describe('Motorcycles Model', () => {
  const motorscycleModel = new MotorcyclesModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(motorcyclesMockWithID);
    sinon.stub(Model, 'find').resolves([motorcyclesMockWithID]);
    sinon.stub(Model, 'findOne').resolves(motorcyclesMockWithID);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(newMotorcyclesMockWithID);
    sinon.stub(Model, 'findByIdAndDelete').resolves(newMotorcyclesMockWithID);
  });

  after(() => {
    sinon.restore();
  });

  describe('Verifica o método "create"', () => {
    it('Sucesso ao registrar uma nova motocicleta', async () => {
      const newMotorcycle = await motorscycleModel.create(motorcyclesMock);
      
      expect(newMotorcycle).to.be.deep.equal(motorcyclesMockWithID);
    });
  });

  describe('Verifica o método "read"', () => {
    it('Sucesso ao exibir a lista de motos registradas', async () => {
      const motorcycles = await motorscycleModel.read();

      expect(motorcycles).to.be.deep.equal([motorcyclesMockWithID]);
    });
  });

  describe('Verifica o método "readOne"', () => {
    it('Sucesso ao procurar a motocicleta pelo ID', async () => {
      const motorcycleID = await motorscycleModel.readOne(idMotorcyclesMock);

      expect(motorcycleID).to.be.deep.equal(motorcyclesMockWithID);
    });

    it('Falha ao procurar a motocicleta pelo ID', async () => {
      try {
				await motorscycleModel.readOne('IdIncorrect');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
    });
  });

  describe('Verifica o método "update"', () => {
    it('Sucesso ao atualizar os dados da moto', async () => {
      const updateMotorcycle = await motorscycleModel.update(idMotorcyclesMock, newMotorcyclesMock);

      expect(updateMotorcycle).to.be.deep.equal(newMotorcyclesMockWithID);
    });

    it('Falha ao atualizar os dados da moto', async () => {
      try {
				await motorscycleModel.update('idIncorreto', newMotorcyclesMock);
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
    });
  });

  describe('Verifica o método "delete"', () => {
    it('Sucesso ao deletar a motocicleta pelo ID', async () => {
      const deleteMotorcycle = await motorscycleModel.delete(idMotorcyclesMock);

      expect(deleteMotorcycle).to.be.deep.equal(newMotorcyclesMockWithID);
    });

    it('Falha ao deletar a motocicleta pelo ID', async () => {
      try {
				await motorscycleModel.delete('idIncorreto');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
    });
  });
});