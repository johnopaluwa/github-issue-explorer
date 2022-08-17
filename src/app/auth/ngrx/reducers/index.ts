import { InjectionToken } from '@angular/core';
import { Action, ActionReducerMap } from '@ngrx/store';
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
