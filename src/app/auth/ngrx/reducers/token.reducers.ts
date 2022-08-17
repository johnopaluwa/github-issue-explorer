import { createReducer, on } from '@ngrx/store';
import { tokenAuthenticated } from '../actions/token.actions';

export interface TokenState {
  githubAPIToken: string;
}

export const initialState: TokenState = {
  githubAPIToken: '',
};

export const tokenReducer = createReducer(
  initialState,
  on(tokenAuthenticated, (state, { token }) => ({
    ...state,
    githubAPIToken: token,
  }))
);
