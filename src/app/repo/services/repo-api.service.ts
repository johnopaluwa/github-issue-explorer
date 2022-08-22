import { Injectable } from '@angular/core';
import { SearchType, SearchWithTypeGQL } from 'src/generated/graphql';

@Injectable({ providedIn: 'root' })
export class RepoApiService {
  constructor(private searchWithTypeGQL: SearchWithTypeGQL) {}
  getPublicRepos() {
    this.searchWithTypeGQL
      .watch({ type: SearchType.Repository })
      .valueChanges.subscribe((s) => console.warn(s.data.search));
  }
}
