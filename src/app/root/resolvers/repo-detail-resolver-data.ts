import {
  GetRepositoryDetailsQuery,
  SearchWithTypeQuery,
} from 'src/generated/graphql';

export type RepoDetailResolverData = {
  getRepositoryDetailsQuery: GetRepositoryDetailsQuery;
  searchWithTypeQuery: SearchWithTypeQuery;
};
