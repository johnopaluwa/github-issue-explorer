import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from './custom-snack-bar/custom-snack-bar.component';

@NgModule({
  declarations: [CustomSnackBarComponent],
  imports: [CommonModule],
  exports: [
    CustomSnackBarComponent,
    MatSnackBarModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
  ],
})
export class NgMaterialModule {}
