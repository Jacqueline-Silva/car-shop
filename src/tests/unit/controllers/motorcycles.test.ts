import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import MotorcyclesModel from '../../../models/MotorcyclesModel';
import MotorcyclesService from '../../../services/Motorcycles';
import MotorcyclesController from '../../../controllers/Motorcycles';
import { idMotorcyclesMock, motorcyclesMock, motorcyclesMockWithID, newMotorcyclesMock, newMotorcyclesMockWithID } from '../../mocks/motorcyclesMock';

describe('Motorcycles Controller', () => {
  const motorcyclesModel = new MotorcyclesModel();
  const motorcyclesService = new MotorcyclesService(motorcyclesModel);
  const motorcyclesController = new MotorcyclesController(motorcyclesService);

  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(motorcyclesService, 'create').resolves(motorcyclesMockWithID);
    sinon.stub(motorcyclesService, 'read').resolves([motorcyclesMockWithID]);
    sinon.stub(motorcyclesService, 'readOne').resolves(motorcyclesMockWithID);
    sinon.stub(motorcyclesService, 'update').resolves(newMotorcyclesMockWithID);
    sinon.stub(motorcyclesService, 'delete').resolves(motorcyclesMockWithID);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.sendStatus = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  describe('Verifica se o método "create"', () => {
    it('Retorna status 201 com os dados da moto registrada', async () => {
      req.body = motorcyclesMock;
      await motorcyclesController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcyclesMockWithID)).to.be.true;
    });
  });

  describe('Verifica se o método "read"', () => {
    it('Retorna status 200 e a lista com todos as motocicletas registradas', async () => {
      await motorcyclesController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([motorcyclesMockWithID])).to.be.true;
    });
  });

  describe('Verifica se o método "readOne"', () => {
    it('Retorna status 200 e os dados da moto selecinada', async () => {
      req.params = { id: idMotorcyclesMock };
      await motorcyclesController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcyclesMockWithID)).to.be.true;
    });
  });

  describe('Verifica se o método "update"', () => {
    it('Retorna status 200 e os dados da moto atualizada', async () => {
      req.params = { id: idMotorcyclesMock };
      req.body = newMotorcyclesMock;
      await motorcyclesController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(newMotorcyclesMockWithID)).to.be.true;
    });
  });

  describe('Verifica se o método "delete"', () => {
    it('Retorna status 204', async () => {
      req.params = { id: idMotorcyclesMock };
      await motorcyclesController.delete(req, res);

      expect((res.sendStatus as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });
});