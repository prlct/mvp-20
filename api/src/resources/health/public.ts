import Router from '@koa/router';
import get from './get';

const router = new Router();

get(router);

export default router.routes();
