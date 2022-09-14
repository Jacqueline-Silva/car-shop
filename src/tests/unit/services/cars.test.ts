import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import CarsModel from '../../../models/CarsModel';
import CarsService from '../../../services/Cars';
import { carsMock, carsMockWithID } from '../../mocks/carsMock';

describe('Cars Service', () => {
	const carsModel = new CarsModel();
	const carsService = new CarsService(carsModel);

	before(() => {
		sinon.stub(carsModel, 'create').resolves(carsMockWithID);
  });

	after(() => {
		sinon.restore();
	});

	describe('Verifica se a função "create"', () => {
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
});