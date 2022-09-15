import { Router } from 'express';
import CarsController from '../controllers/Cars';
import CarsModel from '../models/CarsModel';
import CarsService from '../services/Cars';

const carRoute = Router();

const carModel = new CarsModel();
const carSevice = new CarsService(carModel);
const carController = new CarsController(carSevice);

carRoute.post('/', (req, res) => carController.create(req, res));

carRoute.get('/', (req, res) => carController.read(req, res));

export default carRoute;