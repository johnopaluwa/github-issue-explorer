import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthenticateUserGQL } from 'src/generated/graphql';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private authenticateUserGQL: AuthenticateUserGQL) {}

  authenticate() {
    return this.authenticateUserGQL
      .watch()
      .valueChanges.pipe(map((s) => s.data.viewer));
  }
}
