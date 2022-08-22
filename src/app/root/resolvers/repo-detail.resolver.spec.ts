import { TestBed } from '@angular/core/testing';

import { RepoDetailResolver } from './repo-detail.resolver';

describe('RepoDetailResolver', () => {
  let resolver: RepoDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RepoDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
