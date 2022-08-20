import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GetPublicRepoGQL } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class ExploreService {
  constructor(private getPublicRepoGQL: GetPublicRepoGQL) {}

  getPublicRepoQuery() {
    return this.getPublicRepoGQL
      .watch()
      .valueChanges.pipe(
        map((s) =>
          s.data.search.nodes
            ?.map((node) => (node?.__typename === 'Repository' ? node : null))
            .filter((repos) => !!repos)
        )
      );
  }
}
