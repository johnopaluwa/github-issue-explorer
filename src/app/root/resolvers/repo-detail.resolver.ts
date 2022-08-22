import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchType, SearchWithTypeGQL } from 'src/generated/graphql';
import { ReportProgressSingleton } from '../helpers/report-progress.singleton';

@Injectable({
  providedIn: 'root',
})
export class RepoDetailResolver implements Resolve<any> {
  constructor(private searchWithTypeGQL: SearchWithTypeGQL) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const owner = route.paramMap.get('owner');
    const repository = route.paramMap.get('repository');

    ReportProgressSingleton.getInstance().inProgress();
    return this.searchWithTypeGQL
      .watch({
        type: SearchType.Issue,
        query: `repo:${owner}/${repository} is:issue`,
        first: environment.issuePageCount,
      })
      .valueChanges.pipe(
        take(1),
        map((s) => {
          ReportProgressSingleton.getInstance().done();
          return s.data;
        }),
        catchError((_e) => {
          ReportProgressSingleton.getInstance().failed(
            'Error occured while loading issues'
          );
          return of(null);
        })
      );
  }
}
