import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import carRoute from './routes/cars';

const app = express();
app.use(express.json());

app.use('/cars', carRoute);

app.use(errorHandler);

export default app;