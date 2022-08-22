import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, of, switchMap } from 'rxjs';
import { Pagination } from 'src/app/root/extends/pagination';
import { ReportProgressSingleton } from 'src/app/root/helpers/report-progress.singleton';
import { SearchWithTypeQuery } from 'src/generated/graphql';
import { RepoApiService } from '../services/repo-api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent extends Pagination implements OnInit {
  private initialLoad$ = this.activatedRoute.data.pipe(
    map((data) => data['repoDetail'] as SearchWithTypeQuery)
  );

  private readonly search$ = combineLatest([
    this.initialLoad$,
    this.selectedCursor$,
    this.activatedRoute.paramMap,
  ]).pipe(
    switchMap(([initialLoad, selected, paramMap]) => {
      if (!selected.endCursor && !selected.startCursor) {
        return of(initialLoad.search);
      }

      return this.repoApiService.getIssues(
        `${paramMap.get('owner')}/${paramMap.get('repository')}`,
        ReportProgressSingleton.getInstance(),
        selected.startCursor,
        selected.endCursor
      );
    })
  );

  public issues$ = this.search$.pipe(
    map((search) => {
      if (!search) {
        return undefined;
      }

      return search.nodes
        ?.map((node) => (node?.__typename === 'Issue' ? node : null))
        .filter((issues) => !!issues);
    })
  );

  public pageInfo$ = this.search$.pipe(
    map((search) => {
      if (!search) {
        return undefined;
      }
      return search.pageInfo;
    })
  );
  constructor(
    private activatedRoute: ActivatedRoute,
    private repoApiService: RepoApiService,
    readonly router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {}
}
