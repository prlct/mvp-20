import devConfgig from './development.json';
import stagingConfgig from './staging.json';
import profuctionConfgig from './production.json';

const ENV = process.env;
const env = ENV.APP_ENV || 'development';

let config = null;
switch (ENV.APP_ENV) {
  case 'staging':
    config = stagingConfgig;
    break;

  case 'production':
    config = profuctionConfgig;
    break;

  default:
    config = devConfgig;
    break;
}

export default {
  ...config,
  env,
  port: Number(process.env.PORT) || 3001,
  isDev: env === 'development',
};
