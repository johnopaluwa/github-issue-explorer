import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  public publicRepos$ = this.exploreService.getPublicRepoQuery(
    ReportProgressSingleton.getInstance()
  );

  ngOnInit(): void {}

  changeToken() {
    this.router.navigate([TopLevelUrls.login]);
  }
}
