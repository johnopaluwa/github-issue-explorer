import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleUrls } from './root/enums/global-url.enum';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: `${ModuleUrls.explore}`,
    pathMatch: 'prefix',
    loadChildren: () =>
      import('./explore/explore.module').then((m) => m.ExploreModule),
  },
  {
    path: ':owner/:repository',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('./repo/repo.module').then((m) => m.RepoDetailModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
