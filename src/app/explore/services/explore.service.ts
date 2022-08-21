import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ReportProgressSingleton } from 'src/app/root/helpers/report-progress.singleton';
import { GetPublicRepoGQL } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class ExploreService {
  constructor(private getPublicRepoGQL: GetPublicRepoGQL) {}

  getPublicRepoQuery(progress: ReportProgressSingleton) {
    progress.inProgress();
    return this.getPublicRepoGQL.watch().valueChanges.pipe(
      map((s) => {
        progress.done();
        return s.data.search.nodes
          ?.map((node) => (node?.__typename === 'Repository' ? node : null))
          .filter((repos) => !!repos);
      }),
      catchError((_e) => {
        progress.failed('Error occured while loading public repo.');
        return of(null);
      })
    );
  }
}
