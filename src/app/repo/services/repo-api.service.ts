import { Injectable } from '@angular/core';
import { PublicRepoGQL } from 'src/generated/graphql';

@Injectable({ providedIn: 'root' })
export class RepoApiService {
  constructor(private publicRepoGQL: PublicRepoGQL) {}
  getPublicRepos() {
    this.publicRepoGQL
      .watch()
      .valueChanges.subscribe((s) => console.warn(s.data.search.edges));
  }
}
