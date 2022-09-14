import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import CarsModel from '../../../models/CarsModel';
import CarsService from '../../../services/Cars';
import CarsController from '../../../controllers/Cars';
import { carsMock, carsMockWithID } from '../../mocks/carsMock';

describe('Cars Controller', () => {
  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);
  const carsController = new CarsController(carsService);

  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(carsService, 'create').resolves(carsMockWithID);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  describe('Verifica se a função "create"', () => {
    it('Retorna os dados do carro cadastrado', async () => {
      req.body = carsMock;
      await carsController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMockWithID)).to.be.true;
    });
  });
});