import mount from 'koa-mount';

import userResource from 'resources/user';

export default (app: any) => {
  app.use(mount('/users', userResource));
};
