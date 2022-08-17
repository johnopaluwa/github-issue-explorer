import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthApiService } from '../../services/auth-api.service';
import {
  authenticateToken,
  saveToken,
  tokenAuthenticated,
  tokenSaved,
} from '../actions/token.actions';

@Injectable()
export class TokenEffects {
  saveToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveToken),
      map((action) => {
        return tokenSaved({ token: action.token });
      })
    )
  );

  authenticateToken = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticateToken),
      mergeMap((action) => {
        action.reportProgress.inProgress();
        return this.api.authenticate().pipe(
          map(() => {
            action.reportProgress.done();
            return tokenAuthenticated({ isAuthenticated: true });
          }),
          catchError((_error: Error) => {
            action.reportProgress.failed();
            return of(tokenAuthenticated({ isAuthenticated: false }));
          })
        );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly api: AuthApiService,
    private readonly store: Store
  ) {}
}
