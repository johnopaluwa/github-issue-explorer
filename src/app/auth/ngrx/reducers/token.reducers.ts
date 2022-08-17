import { createReducer, on } from '@ngrx/store';
import { tokenAuthenticated, tokenSaved } from '../actions/token.actions';

export interface TokenState {
  githubAPIToken: string;
  isAuthenticated: boolean;
}

export const initialState: TokenState = {
  githubAPIToken: '',
  isAuthenticated: false,
};

export const tokenReducer = createReducer(
  initialState,
  on(tokenSaved, (state, { token }) => ({
    ...state,
    githubAPIToken: token,
  })),
  on(tokenAuthenticated, (state, { isAuthenticated }) => ({
    ...state,
    isAuthenticated: isAuthenticated,
  }))
);
