import mount from 'koa-mount';

import healthResource from 'resources/health/public';

export default (app: any) => {
  app.use(mount('/health', healthResource));
};
