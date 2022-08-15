import { Injectable } from '@angular/core';
import { PublicRepoGQL } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private publicRepoGQL: PublicRepoGQL) {}

  authenticate() {
    this.publicRepoGQL
      .watch()
      .valueChanges.subscribe((s) => console.warn(s.data.search.edges));
  }
}
