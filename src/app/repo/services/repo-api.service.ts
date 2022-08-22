import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ReportProgressSingleton } from 'src/app/root/helpers/report-progress.singleton';
import { environment } from 'src/environments/environment';
import { SearchType, SearchWithTypeGQL } from 'src/generated/graphql';

@Injectable({ providedIn: 'root' })
export class RepoApiService {
  constructor(private searchWithTypeGQL: SearchWithTypeGQL) {}
  getIssues(
    nameWithOwner: string,
    reportProgress: ReportProgressSingleton,
    before?: string | null | undefined,
    after?: string | null | undefined
  ) {
    reportProgress.inProgress();
    return this.searchWithTypeGQL
      .watch({
        type: SearchType.Issue,
        query: `repo:${nameWithOwner} is:issue`,
        first:
          (!after && !before) || !!after
            ? environment.publicRepoPageCount
            : undefined,
        last: !!before ? environment.publicRepoPageCount : undefined,
        before: before,
        after: after,
      })
      .valueChanges.pipe(
        map((s) => {
          reportProgress.done();
          return s.data.search;
        }),
        catchError((_e) => {
          reportProgress.failed('Loading issues failed.');
          return of(null);
        })
      );
  }
}
