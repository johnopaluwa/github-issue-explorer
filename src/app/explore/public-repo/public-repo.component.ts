import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, of, switchMap } from 'rxjs';
import { Pagination } from 'src/app/root/extends/pagination';
import { ReportProgressSingleton } from 'src/app/root/helpers/report-progress.singleton';
import { ExploreService } from '../services/explore.service';

@Component({
  selector: 'app-public-repo',
  templateUrl: './public-repo.component.html',
  styleUrls: ['./public-repo.component.scss'],
})
export class PublicRepoComponent extends Pagination implements OnInit {
  constructor(
    private readonly exploreService: ExploreService,
    readonly router: Router
  ) {
    super(router);
  }

  public initialLoad$ = this.exploreService.getPublicRepoQuerySearch(
    ReportProgressSingleton.getInstance()
  );

  public publicRepoSearch$ = combineLatest([
    this.initialLoad$,
    this.selectedCursor$,
  ]).pipe(
    switchMap(([initialLoad, selected]) => {
      if (!selected.endCursor && !selected.startCursor) {
        return of(initialLoad);
      }

      return this.exploreService.getPublicRepoQuerySearch(
        ReportProgressSingleton.getInstance(),
        selected.startCursor,
        selected.endCursor
      );
    })
  );

  public publicRepos$ = this.publicRepoSearch$.pipe(
    map((search) => {
      if (!search) {
        return undefined;
      }

      return search.nodes
        ?.map((node) => (node?.__typename === 'Repository' ? node : null))
        .filter((repos) => !!repos);
    })
  );

  public pageInfo$ = this.publicRepoSearch$.pipe(
    map((search) => {
      if (!search) {
        return undefined;
      }
      return search.pageInfo;
    })
  );

  ngOnInit(): void {}

  gotoRepoDetails(nameWithOwner: string | undefined) {
    this.router.navigate([nameWithOwner]);
  }
}
