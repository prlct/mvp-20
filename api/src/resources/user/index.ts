import Router, { RouterContext } from '@koa/router';
import getCurrent from './getCurrent';

const router = new Router();

getCurrent(router);

export default router
  .param('id', async (paramValue: unknown, ctx: RouterContext, next: () => Promise<unknown>) => {
    // TODO: edit
    ctx.state.user = { _id: 1 };

    if (!ctx.state.user) {
      ctx.status = 404;

      return;
    }

    await next();
  })
  .routes();
