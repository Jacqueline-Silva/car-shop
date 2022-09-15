import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import CarsModel from '../../../models/CarsModel';
import CarsService from '../../../services/Cars';
import CarsController from '../../../controllers/Cars';
import { carsMock, carsMockWithID, idCarsMock, newCarsMock, newCarsMockWithID } from '../../mocks/carsMock';

describe('Cars Controller', () => {
  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);
  const carsController = new CarsController(carsService);

  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(carsService, 'create').resolves(carsMockWithID);
    sinon.stub(carsService, 'read').resolves([carsMockWithID]);
    sinon.stub(carsService, 'readOne').resolves(carsMockWithID);
    sinon.stub(carsService, 'update').resolves(newCarsMockWithID);
    sinon.stub(carsService, 'delete').resolves(carsMockWithID);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.sendStatus = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  describe('Verifica se o método "create"', () => {
    it('Retorna status 201 com os dados do carro cadastrado', async () => {
      req.body = carsMock;
      await carsController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMockWithID)).to.be.true;
    });
  });

  describe('Verifica se o método "read"', () => {
    it('Retorna status 200 e a lista com todos os carros cadastrados', async () => {
      await carsController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carsMockWithID])).to.be.true;
    });
  });

  describe('Verifica se o método "readOne"', () => {
    it('Retorna status 200 e os dados do carro selecionado', async () => {
      req.params = { id: idCarsMock };
      await carsController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMockWithID)).to.be.true;
    });
  });

  describe('Verifica se o método "update"', () => {
    it('Retorna status 200 e os dados do carro atualizado', async () => {
      req.params = { id: idCarsMock };
      req.body = newCarsMock;
      await carsController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(newCarsMockWithID)).to.be.true;
    });
  });

  describe('Verifica se o método "delete"', () => {
    it('Retorna status 204', async () => {
      req.params = { id: idCarsMock };
      await carsController.delete(req, res);

      expect((res.sendStatus as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });
});