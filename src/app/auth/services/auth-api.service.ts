import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  AuthenticateUserGQL,
  SearchType,
  SearchWithTypeGQL,
} from 'src/generated/graphql';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(
    private authenticateUserGQL: AuthenticateUserGQL,
    private searchWithTypeGQL: SearchWithTypeGQL
  ) {}

  authenticate() {
    return this.authenticateUserGQL
      .watch({}, { fetchPolicy: 'no-cache' })
      .valueChanges.pipe(map((s) => s.data.viewer));
  }

  preloadPublicRepo() {
    return this.searchWithTypeGQL
      .watch({
        type: SearchType.Repository,
        first: environment.publicRepoPageCount,
      })
      .valueChanges.pipe(map((s) => s.data));
  }
}
