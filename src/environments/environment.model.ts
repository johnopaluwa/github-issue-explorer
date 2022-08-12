export type Environment = {
  production: boolean;
  githubPersonlaAccess: string;
};

export const ENVIRONMENT_DEFAULTS: Environment = {
  production: false,
  githubPersonlaAccess: '',
};
