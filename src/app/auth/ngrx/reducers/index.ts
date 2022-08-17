import { InjectionToken } from '@angular/core';
import {
  Action,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { tokenReducer, TokenState } from './token.reducers';

export interface AuthState {
  token: TokenState;
}

export const AUTH_REDUCERS = new InjectionToken<
  ActionReducerMap<AuthState, Action>
>('Auth reducers', {
  factory: () => ({
    token: tokenReducer,
  }),
});

export const authStateKey = 'auth';

const getAuthState = createFeatureSelector<AuthState>(authStateKey);

export const getTokenState = createSelector(
  getAuthState,
  (state) => state.token
);

export const getGithubAPIToken = createSelector(
  getTokenState,
  (state) => state?.githubAPIToken
);
