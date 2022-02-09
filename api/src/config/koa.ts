import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';

import qs from 'koa-qs';
import multer from '@koa/multer';
import routes from './routes';

const upload = multer();

export default (app: any) => {
  app.use(cors({ credentials: true }));
  app.use(helmet());
  qs(app);
  app.use(upload.any());
  app.use(bodyParser({
    enableTypes: ['json', 'form', 'text'],
    onerror: (err: Error, ctx) => {
      console.dir(ctx.request.rawBody);
      const errText: string = err.stack || err.toString();
      console.warn(`Unable to parse request body. ${errText}`);
      ctx.throw(422, 'Unable to parse request JSON.');
    },
  }));

  routes(app);
};
