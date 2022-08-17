import { Injectable } from '@angular/core';
import { GetPublicRepoGQL } from 'src/generated/graphql';

@Injectable({ providedIn: 'root' })
export class RepoApiService {
  constructor(private getPublicRepoGQL: GetPublicRepoGQL) {}
  getPublicRepos() {
    this.getPublicRepoGQL
      .watch()
      .valueChanges.subscribe((s) => console.warn(s.data.search.edges));
  }
}
