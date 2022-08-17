import { Environment, ENVIRONMENT_DEFAULTS } from './environment.model';

export const environment: Environment = {
  ...ENVIRONMENT_DEFAULTS,
  production: true,
};
