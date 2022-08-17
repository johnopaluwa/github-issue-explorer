import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { errorAction } from 'src/app/root/ngrx/actions/core.actions';
import { AuthApiService } from '../../services/auth-api.service';
import {
  authenticateToken,
  tokenAuthenticated,
} from '../actions/token.actions';

@Injectable()
export class TokenEffects {
  authenticateToken = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticateToken),
      mergeMap((action) => {
        action.reportProgress.inProgress();
        return this.api.authenticate().pipe(
          map(() => {
            action.reportProgress.done();
            return tokenAuthenticated({ token: action.token });
          }),
          catchError((error: Error) => {
            action.reportProgress.failed();
            return of(errorAction({ action: action.type, error: error }));
          })
        );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly api: AuthApiService
  ) {}
}
