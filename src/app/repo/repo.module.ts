import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RepoRoutingModule } from './repo-routing.module';
import { RepoComponent } from './repo.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [RepoComponent, DetailComponent],
  imports: [CommonModule, RepoRoutingModule],
})
export class RepoDetailModule {}
