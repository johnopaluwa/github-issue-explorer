import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopLevelUrls } from './root/enums/global-url.enum';
import { AuthGuard } from './root/guards/auth.guard';

const routes: Routes = [
  {
    path: `${TopLevelUrls.login}`,
    pathMatch: 'prefix',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: `${TopLevelUrls.explore}`,
    pathMatch: 'prefix',
    loadChildren: () =>
      import('./explore/explore.module').then((m) => m.ExploreModule),
    canActivate: [AuthGuard],
  },
  {
    path: ':owner/:repository',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('./repo/repo.module').then((m) => m.RepoDetailModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
