import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './explore.component';
import { PublicRepoComponent } from './public-repo/public-repo.component';

const routes: Routes = [
  {
    path: '',
    component: ExploreComponent,
    children: [{ path: '', component: PublicRepoComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreRoutingModule {}
