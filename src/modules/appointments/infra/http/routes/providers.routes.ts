import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityControler from '../controllers/ProviderMonthAvailabilityControler';
import ProviderDayAvailabilityControler from '../controllers/ProviderDayAvailabilityControler';

const providersRouter = Router();
const providersControler = new ProvidersController();
const providerMonthAvailabilityControler = new ProviderMonthAvailabilityControler();
const providerDayAvailabilityControler = new ProviderDayAvailabilityControler();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersControler.index);

providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityControler.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityControler.index,
);

export default providersRouter;
