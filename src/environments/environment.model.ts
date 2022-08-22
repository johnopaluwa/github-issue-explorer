export type Environment = {
  production: boolean;
  publicRepoPageCount: number;
};

export const ENVIRONMENT_DEFAULTS: Environment = {
  production: false,
  publicRepoPageCount: 50,
};
