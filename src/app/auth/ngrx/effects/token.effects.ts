import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { TopLevelUrls } from 'src/app/root/enums/global-url.enum';
import { AuthApiService } from '../../services/auth-api.service';
import {
  authenticateToken,
  saveToken,
  tokenAuthenticationFailed,
  tokenAuthenticationSuccessful,
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

  authenticateToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticateToken),
      mergeMap((action) => {
        action.reportProgress.inProgress();
        return this.api.authenticate().pipe(
          map(() => {
            action.reportProgress.done();
            return tokenAuthenticationSuccessful();
          }),
          catchError((_error: Error) => {
            action.reportProgress.failed();
            return of(tokenAuthenticationFailed());
          })
        );
      })
    )
  );

  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(tokenAuthenticationSuccessful),
        tap((_) => this.router.navigate([TopLevelUrls.explore]))
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly api: AuthApiService,
    private readonly store: Store,
    private readonly router: Router
  ) {}
}
