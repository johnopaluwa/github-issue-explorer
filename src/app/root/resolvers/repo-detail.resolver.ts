import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, combineLatest, map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  GetRepositoryDetailsGQL,
  SearchType,
  SearchWithTypeGQL,
} from 'src/generated/graphql';
import { ReportProgressSingleton } from '../helpers/report-progress.singleton';
import { RepoDetailResolverData } from './repo-detail-resolver-data';

@Injectable({
  providedIn: 'root',
})
export class RepoDetailResolver
  implements Resolve<RepoDetailResolverData | null>
{
  constructor(
    private searchWithTypeGQL: SearchWithTypeGQL,
    private getRepositoryDetailsGQL: GetRepositoryDetailsGQL
  ) {}
  resolve(route: ActivatedRouteSnapshot) {
    const owner = route.paramMap.get('owner');
    const repository = route.paramMap.get('repository');

    if (!owner || !repository) {
      return of(null);
    }

    ReportProgressSingleton.getInstance().inProgress();

    const getRepositoryDetailsQuery$ = this.getRepositoryDetailsGQL
      .watch({ name: repository, owner: owner })
      .valueChanges.pipe(
        map((s) => s.data),
        catchError((_) => of(null))
      );

    const searchWithTypeQuery$ = this.searchWithTypeGQL
      .watch({
        type: SearchType.Issue,
        query: `repo:${owner}/${repository} is:issue`,
        first: environment.issuePageCount,
      })
      .valueChanges.pipe(
        map((s) => s.data),
        catchError((_) => of(null))
      );

    return combineLatest([
      getRepositoryDetailsQuery$,
      searchWithTypeQuery$,
    ]).pipe(
      take(1),
      map(([getRepositoryDetailsQuery, searchWithTypeQuery]) => {
        if (!getRepositoryDetailsQuery || !searchWithTypeQuery) {
          ReportProgressSingleton.getInstance().failed(
            'Error occured while loading issues'
          );
          return null;
        }

        ReportProgressSingleton.getInstance().done();
        return {
          getRepositoryDetailsQuery: getRepositoryDetailsQuery,
          searchWithTypeQuery: searchWithTypeQuery,
        } as RepoDetailResolverData;
      })
    );
  }
}
