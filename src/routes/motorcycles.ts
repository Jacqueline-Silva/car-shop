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

export default motorcyclesRoute;