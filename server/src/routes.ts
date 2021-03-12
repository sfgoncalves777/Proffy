import express from 'express';
const routes = express.Router();

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const clasessControler = new ClassesController();
const connectionsController = new ConnectionsController();

routes.post('/classes', clasessControler.create);
routes.get('/classes', clasessControler.index);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes