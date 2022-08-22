import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticateUserGQL, GetPublicRepoGQL } from 'src/generated/graphql';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(
    private authenticateUserGQL: AuthenticateUserGQL,
    private getPublicRepoGQL: GetPublicRepoGQL
  ) {}

  authenticate() {
    return this.authenticateUserGQL
      .watch({}, { fetchPolicy: 'no-cache' })
      .valueChanges.pipe(map((s) => s.data.viewer));
  }

  preloadPublicRepo() {
    return this.getPublicRepoGQL
      .watch({ first: environment.publicRepoPageCount })
      .valueChanges.pipe(map((s) => s.data));
  }
}
