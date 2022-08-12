import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private apollo: Apollo) {}

  authenticate(token: string) {}
}
