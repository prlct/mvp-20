import utils from '@paperclip/utils';

const ENV = process.env;
const env = ENV.APP_ENV || 'development';

const base = {
  env,
  port: Number(ENV.PORT) || 3001,
  isDev: env === 'development',
  defaultErrorMessage: 'Oops, something went wrong. Please, try again later.',
  apiUrl: '',
};

const config = utils.configUtil.loadConfig(base, env, __dirname);

// for release env
if (ENV.API_URL) {
  config.apiUrl = ENV.API_URL;
}

export default config;
