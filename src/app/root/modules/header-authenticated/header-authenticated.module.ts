import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgMaterialModule } from '../ng-material/ng-material.module';
import { HeaderAuthenticatedComponent } from './header-authenticated.component';

@NgModule({
  declarations: [HeaderAuthenticatedComponent],
  imports: [CommonModule, NgMaterialModule],
  exports: [HeaderAuthenticatedComponent],
})
export class HeaderAuthenticatedModule {}
