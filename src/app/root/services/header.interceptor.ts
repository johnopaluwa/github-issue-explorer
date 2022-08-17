import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, mergeMap, Observable } from 'rxjs';
import { getGithubAPIToken } from 'src/app/auth/ngrx/reducers';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.warn(1);
    return this.store.select(getGithubAPIToken).pipe(
      first(),
      mergeMap((token) => {
        const authReq = !!token
          ? request.clone({
              setHeaders: { Authorization: `Bearer ${token}` },
            })
          : request;
        return next.handle(authReq);
      })
    );
  }
}
