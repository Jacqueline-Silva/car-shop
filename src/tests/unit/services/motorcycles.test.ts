import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import MotorcyclesModel from '../../../models/MotorcyclesModel';
import MotorcyclesService from '../../../services/Motorcycles';
import { idMotorcyclesMock, motorcyclesMock, motorcyclesMockWithID, newMotorcyclesMock, newMotorcyclesMockWithID } from '../../mocks/motorcyclesMock';

describe('Motorcycles Service', () => {
	const motorcyclesModel = new MotorcyclesModel();
	const motorcyclesService = new MotorcyclesService(motorcyclesModel);

	before(() => {
		sinon.stub(motorcyclesModel, 'create').resolves(motorcyclesMockWithID);
		sinon.stub(motorcyclesModel, 'read').resolves([motorcyclesMockWithID]);
    sinon.stub(motorcyclesModel, 'readOne')
			.onCall(0).resolves(motorcyclesMockWithID)
			.onCall(1).resolves(null)
			.onCall(2).resolves(newMotorcyclesMockWithID);
			sinon.stub(motorcyclesModel, 'update')
			.onCall(0).resolves(newMotorcyclesMockWithID)
			.onCall(1).resolves(null);
		sinon.stub(motorcyclesModel, 'delete')
			.onCall(0).resolves(motorcyclesMockWithID)
			.onCall(1).resolves(null);
  });

	after(() => {
		sinon.restore();
	});

	describe('Verifica se o método "create"', () => {
		it('Cadastra com sucesso uma nova motocicleta', async () => {
			const motorcycle = await motorcyclesService.create(motorcyclesMock);

			expect(motorcycle).to.be.deep.equal(motorcyclesMockWithID);
		});

		it('Lança um erro ao não passar os dados corretos da moto', async () => {
			try {
				await motorcyclesService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('Verifica se o método "read"', () => {
		it('Retorna com sucesso a lista de motos registradas', async () => {
			const motorcycles = await motorcyclesService.read();

			expect(motorcycles).to.be.deep.equal([motorcyclesMockWithID]);
		});
	});

	describe('Verifica se o método "readOne"', () => {
		it('Retorna com sucesso os dados da moto encontrada pelo ID', async () => {
			const motorcycleID = await motorcyclesService.readOne(idMotorcyclesMock);

			expect(motorcycleID).to.be.deep.equal(motorcyclesMockWithID);
		});

		it('Retorna um erro ao não passar o ID correto da moto', async () => {
			try {
				await motorcyclesService.readOne('idIncorrect');
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Verifica se o método "update"', () => {
		it('Retorna com sucesso os dados da moto atualizados', async () => {
			await motorcyclesService.readOne(idMotorcyclesMock);
			const updateMotorcycle = await motorcyclesService.update(idMotorcyclesMock, newMotorcyclesMock);

			expect(updateMotorcycle).to.be.deep.equal(newMotorcyclesMockWithID);
		});

		it('Lança um erro ao não passar os dados corretos', async () => {
			try {
				await motorcyclesService.update(idMotorcyclesMock, {} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});

		it('Retorna um erro ao não encontrar a moto pelo id', async () => {
			try {
				await motorcyclesService.update('idIncorrect', newMotorcyclesMock);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Verifica se o método "delete"', () => {
		it('Retorna com sucesso a motocicleta deletada', async () => {
			const deleteMotorcycle = await motorcyclesService.delete(idMotorcyclesMock);

			expect(deleteMotorcycle).to.be.deep.equal(motorcyclesMockWithID);
		});

		it('Retorna um erro ao não encontrar a moto pelo id', async () => {
			try {
				await motorcyclesService.delete('idIncorrect');
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});
});