import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderAuthenticatedModule } from '../root/modules/header-authenticated/header-authenticated.module';
import { NgMaterialModule } from '../root/modules/ng-material/ng-material.module';
import { PaginatorModule } from '../root/modules/paginator/paginator.module';
import { DetailComponent } from './detail/detail.component';
import { RepoRoutingModule } from './repo-routing.module';
import { RepoComponent } from './repo.component';

@NgModule({
  declarations: [RepoComponent, DetailComponent],
  imports: [
    CommonModule,
    NgMaterialModule,
    PaginatorModule,
    HeaderAuthenticatedModule,
    RepoRoutingModule,
  ],
})
export class RepoDetailModule {}
