import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, of, switchMap } from 'rxjs';
import { TopLevelUrls } from 'src/app/root/enums/global-url.enum';
import { ReportProgressSingleton } from 'src/app/root/helpers/report-progress.singleton';
import { ExploreService } from '../services/explore.service';

@Component({
  selector: 'app-public-repo',
  templateUrl: './public-repo.component.html',
  styleUrls: ['./public-repo.component.scss'],
})
export class PublicRepoComponent implements OnInit {
  constructor(
    private readonly exploreService: ExploreService,
    private readonly router: Router
  ) {}

  public readonly selectedCursor$ = new BehaviorSubject<{
    startCursor: string | null | undefined;
    endCursor: string | null | undefined;
  }>({ endCursor: undefined, startCursor: undefined });

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

  changeToken() {
    this.router.navigate([TopLevelUrls.login]);
  }

  gotoNextPage(pointer: string | null | undefined) {
    this.selectedCursor$.next({ endCursor: pointer, startCursor: undefined });
  }

  gotoPreviousPage(pointer: string | null | undefined) {
    this.selectedCursor$.next({ startCursor: pointer, endCursor: undefined });
  }
}
