import _ from 'lodash';
import Router from '@koa/router';

async function handler(ctx: any) {
  ctx.body = {
    message: 'hello'
  };
}

export default (router: Router) => {
  router.get('/current', handler);
};
