import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { PublicRepoComponent } from './public-repo/public-repo.component';

@NgModule({
  declarations: [ExploreComponent, PublicRepoComponent],
  imports: [CommonModule, ExploreRoutingModule],
})
export class ExploreModule {}
