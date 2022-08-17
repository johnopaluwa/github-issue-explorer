import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor() {}

  authenticate() {
    return of(null);
  }
}
