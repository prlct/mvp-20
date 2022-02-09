import Router from '@koa/router';

const handler = (ctx: any) => {
  ctx.status = 200;
};

export default (router: Router) => {
  router.get('/', handler);
};
