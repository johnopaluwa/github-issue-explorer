import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { combineLatest, filter, startWith, Subject, takeUntil } from 'rxjs';
import { ReportProgressSingleton } from './root/helpers/report-progress.singleton';
import { CustomSnackBarComponent } from './root/modules/ng-material/custom-snack-bar/custom-snack-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'github-issue-explorer';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  public readonly reportProgress = ReportProgressSingleton.getInstance();

  private destroy$ = new Subject<void>();

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    combineLatest([
      this.reportProgress.isFailed$,
      this.reportProgress.result$.pipe(startWith(null)),
    ])
      .pipe(
        takeUntil(this.destroy$),
        filter(([failed, result]) => failed && !!result)
      )
      .subscribe(([_, result]) => this.openSnackBar(result));
  }

  openSnackBar(failedMessage: string | null) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      data: failedMessage,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
