import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { RepoComponent } from './repo.component';

const routes: Routes = [
  {
    path: '',
    component: RepoComponent,
    children: [{ path: '', component: DetailComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepoRoutingModule {}
