import { Router } from 'express';
import MotorcyclesController from '../controllers/Motorcycles';
import MotorcyclesModel from '../models/MotorcyclesModel';
import MotorcyclesService from '../services/Motorcycles';

const motorcyclesRoute = Router();

const motorcycleModel = new MotorcyclesModel();
const motorcyclesService = new MotorcyclesService(motorcycleModel);
const motorcyclesController = new MotorcyclesController(motorcyclesService);

motorcyclesRoute.post('/', (req, res) => motorcyclesController.create(req, res));

motorcyclesRoute.get('/', (req, res) => motorcyclesController.read(req, res));

motorcyclesRoute.get('/:id', (req, res) => motorcyclesController.readOne(req, res));

motorcyclesRoute.put('/:id', (req, res) => motorcyclesController.update(req, res));

motorcyclesRoute.delete('/:id', (req, res) => motorcyclesController.delete(req, res));

export default motorcyclesRoute;