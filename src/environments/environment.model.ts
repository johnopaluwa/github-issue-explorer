export type Environment = {
  production: boolean;
  publicRepoPageCount: number;
  issuePageCount: number;
};

export const ENVIRONMENT_DEFAULTS: Environment = {
  production: false,
  publicRepoPageCount: 50,
  issuePageCount: 50,
};
