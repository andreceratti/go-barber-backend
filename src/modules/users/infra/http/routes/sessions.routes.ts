import { Router } from 'express';

import SessionsControler from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsControler = new SessionsControler();

sessionsRouter.post('/', sessionsControler.create);

export default sessionsRouter;
