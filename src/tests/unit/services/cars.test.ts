import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarsModel from '../../../models/CarsModel';
import CarsService from '../../../services/Cars';
import { carsMock, carsMockWithID, idCarsMock, newCarsMock, newCarsMockWithID } from '../../mocks/carsMock';

describe('Cars Service', () => {
	const carsModel = new CarsModel();
	const carsService = new CarsService(carsModel);

	before(() => {
		sinon.stub(carsModel, 'create').resolves(carsMockWithID);
		sinon.stub(carsModel, 'read').resolves([carsMockWithID]);
    sinon.stub(carsModel, 'readOne')
			.onCall(0).resolves(carsMockWithID)
			.onCall(1).resolves(null)
			.onCall(2).resolves(newCarsMockWithID);
		sinon.stub(carsModel, 'update')
			.onCall(0).resolves(newCarsMockWithID)
			.onCall(1).resolves(null);
		sinon.stub(carsModel, 'delete')
			.onCall(0).resolves(carsMockWithID)
			.onCall(1).resolves(null);
  });

	after(() => {
		sinon.restore();
	});

	describe('Verifica se o método "create"', () => {
		it('Cadastra com sucesso um novo carro', async () => {
			const results = await carsService.create(carsMock);

			expect(results).to.be.deep.equal(carsMockWithID);
		});

		it('Lança um erro ao não passar os dados corretos', async () => {
			try {
				await carsService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('Verifica se o método "read"', () => {
		it('Retorna com sucesso a lista de carros cadastrados', async () => {
			const cars = await carsService.read();

			expect(cars).to.be.deep.equal([carsMockWithID]);
		});
	});

	describe('Verifica se o método "readOne"', () => {
		it('Retorna com sucesso os dados do carro cadastrado', async () => {
			const carId = await carsService.readOne(idCarsMock);

			expect(carId).to.be.deep.equal(carsMockWithID);
		});

		it('Retorna um erro ao não passar o ID correto', async () => {
			try {
				await carsService.readOne('idIncorrect');
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Verifica se o método "update"', () => {
		it('Retorna com sucesso o carro atualizado', async () => {
			await carsService.readOne(idCarsMock);
			const updateCar = await carsService.update(idCarsMock, newCarsMock);

			expect(updateCar).to.be.deep.equal(newCarsMockWithID);
		});

		it('Lança um erro ao não passar os dados corretos', async () => {
			try {
				await carsService.update(idCarsMock, {} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});

		it('Retorna um erro ao não encontrar o carro pelo id', async () => {
			try {
				await carsService.update('idIncorrect', newCarsMock);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Verifica se o método "delete"', () => {
		it('Retorna com sucesso o carro deletado', async () => {
			const deleteCar = await carsService.delete(idCarsMock);

			expect(deleteCar).to.be.deep.equal(carsMockWithID);
		});

		it('Retorna um erro ao não encontrar o carro pelo id', async () => {
			try {
				await carsService.delete('idIncorrect');
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});
});