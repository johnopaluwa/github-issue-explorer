import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { getIsUserAuthenticated } from 'src/app/auth/ngrx/reducers';
import { TopLevelUrls } from '../enums/global-url.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly store: Store, private readonly router: Router) {}
  canActivate() {
    return this.isAuthenticated().pipe(
      map((isAuthenticated) =>
        isAuthenticated ? true : this.router.parseUrl(`${TopLevelUrls.login}`)
      )
    );
  }

  private isAuthenticated() {
    return this.store.pipe(select(getIsUserAuthenticated), take(1));
  }
}
