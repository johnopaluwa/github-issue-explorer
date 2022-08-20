import { Component, OnInit } from '@angular/core';
import { ExploreService } from '../services/explore.service';

@Component({
  selector: 'app-public-repo',
  templateUrl: './public-repo.component.html',
  styleUrls: ['./public-repo.component.scss'],
})
export class PublicRepoComponent implements OnInit {
  constructor(private readonly exploreService: ExploreService) {}

  public publicRepos$ = this.exploreService.getPublicRepoQuery();

  ngOnInit(): void {}
}
