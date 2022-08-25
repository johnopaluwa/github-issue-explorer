import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { marbles } from 'rxjs-marbles/jasmine';
import { TestObservableLike } from 'rxjs-marbles/types';
import { getIsUserAuthenticated } from 'src/app/auth/ngrx/reducers';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: MockStore;
  let routerSpy: Router;
  const urlTree = new UrlTree();

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);

    (routerSpy.parseUrl as jasmine.Spy).and.returnValue(urlTree);

    TestBed.configureTestingModule({
      providers: [provideMockStore(), { provide: Router, useValue: routerSpy }],
    });
    guard = TestBed.inject(AuthGuard);

    store = TestBed.inject(MockStore);
    store.overrideSelector(getIsUserAuthenticated, true);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it(
    'should activate route when user authenticated',
    marbles((m) => {
      const expected$: TestObservableLike<true | UrlTree> = m.cold('(a|)', {
        a: true,
      });
      m.expect(guard.canActivate()).toBeObservable(expected$);
    })
  );

  it(
    'should not activate route when user is not authenticated',
    marbles((m) => {
      store.overrideSelector(getIsUserAuthenticated, false);
      const expected$: TestObservableLike<true | UrlTree> = m.cold('(a|)', {
        a: urlTree,
      });
      m.expect(guard.canActivate()).toBeObservable(expected$);
    })
  );
});
