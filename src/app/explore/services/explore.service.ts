import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ReportProgressSingleton } from 'src/app/root/helpers/report-progress.singleton';
import { environment } from 'src/environments/environment';
import { GetPublicRepoGQL } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class ExploreService {
  constructor(private getPublicRepoGQL: GetPublicRepoGQL) {}

  getPublicRepoQuerySearch(
    progress: ReportProgressSingleton,
    before?: string,
    after?: string
  ) {
    progress.inProgress();
    return this.getPublicRepoGQL
      .watch({
        pageCount: environment.publicRepoPageCount,
        before: before,
        after: after,
      })
      .valueChanges.pipe(
        map((s) => {
          progress.done();
          return s.data.search;
        }),
        catchError((_e) => {
          progress.failed('Error occured while loading public repo.');
          return of(null);
        })
      );
  }
}
