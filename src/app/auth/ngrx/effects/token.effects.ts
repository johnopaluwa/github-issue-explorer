import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { TopLevelUrls } from 'src/app/root/enums/global-url.enum';
import { AuthApiService } from '../../services/auth-api.service';
import {
  authenticateToken,
  repoDataPreloaded,
  repoDataPreloadFailed,
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
        return tokenSaved({
          token: action.token,
          reportProgress: action.reportProgress,
        });
      })
    )
  );

  tokenSaved$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tokenSaved),
      map((action) =>
        authenticateToken({
          token: action.token,
          reportProgress: action.reportProgress,
        })
      )
    )
  );

  authenticateToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticateToken),
      mergeMap((action) => {
        action.reportProgress.inProgress();
        return this.api.authenticate().pipe(
          map(() => {
            return tokenAuthenticationSuccessful({
              reportProgress: action.reportProgress,
            });
          }),
          catchError((_error: Error) => {
            action.reportProgress.failed();
            return of(tokenAuthenticationFailed());
          })
        );
      })
    )
  );

  preloadRepoData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tokenAuthenticationSuccessful),
      mergeMap((action) => {
        action.reportProgress.inProgress();
        return this.api.preloadPublicRepo().pipe(
          map(() => {
            action.reportProgress.done();
            return repoDataPreloaded();
          }),
          catchError((_error: Error) => {
            action.reportProgress.failed();
            return of(repoDataPreloadFailed());
          })
        );
      })
    )
  );

  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(repoDataPreloaded),
        tap((_) => this.router.navigate([TopLevelUrls.explore]))
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly api: AuthApiService,
    private readonly router: Router
  ) {}
}
