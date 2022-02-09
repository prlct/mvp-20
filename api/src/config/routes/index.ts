import auth from 'middlewares/auth.middleware';

import publicRoutes from './public';
import authenticatedRoutes from './authenticated';

const defineRoutes = (app: any) => {
  publicRoutes(app);

  app.use(auth);

  authenticatedRoutes(app);
};

export default defineRoutes;
