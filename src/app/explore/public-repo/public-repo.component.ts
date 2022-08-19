import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { GetPublicRepoGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-public-repo',
  templateUrl: './public-repo.component.html',
  styleUrls: ['./public-repo.component.scss'],
})
export class PublicRepoComponent implements OnInit {
  constructor(private getPublicRepoGQL: GetPublicRepoGQL) {}

  public publicRepos$ = this.getPublicRepoGQL
    .watch()
    .valueChanges.pipe(
      map((s) =>
        s.data.search.nodes
          ?.map((node) => (node?.__typename === 'Repository' ? node : null))
          .filter((repos) => !!repos)
      )
    );

  ngOnInit(): void {}
}
