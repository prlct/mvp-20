// allows require modules relative to /src folder
// for example: require('lib/mongo/idGenerator')
// all options can be found here: https://gist.github.com/branneman/8048520
import moduleAlias from 'module-alias';
moduleAlias.addPath(__dirname);
moduleAlias(); // read aliases from package json
// A bit hacky, but makes logger globally available to the npm packages
import logger from 'logger';

import Koa from 'koa';
import http from 'http';
import config from 'config';

import initKoa from 'config/koa';

process.env.APP_ENV = process.env.APP_ENV || 'development';

import migrator from 'migrations/index';

let app;
(async () => {
  await migrator.exec();

  app = new Koa();
  initKoa(app);

  const server = http.createServer(app.callback());

  const message = `Api server listening on ${config.port}, in ${config.env} mode and ${process.env.APP_ENV} env`;
  server.listen(config.port, () => {
    logger.info(message);
  });
})();


export default app;
