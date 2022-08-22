import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TopLevelUrls } from '../enums/global-url.enum';

@Directive()
export abstract class Pagination {
  readonly selectedCursor$ = new BehaviorSubject<{
    startCursor: string | null | undefined;
    endCursor: string | null | undefined;
  }>({ endCursor: undefined, startCursor: undefined });

  constructor(readonly router: Router) {}

  changeToken() {
    this.router.navigate([TopLevelUrls.login]);
  }

  gotoNextPage(pointer: string | null | undefined) {
    this.selectedCursor$.next({ endCursor: pointer, startCursor: undefined });
  }

  gotoPreviousPage(pointer: string | null | undefined) {
    this.selectedCursor$.next({ startCursor: pointer, endCursor: undefined });
  }
}
