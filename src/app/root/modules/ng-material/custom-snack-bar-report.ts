import { Directive, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, filter, startWith, Subject, takeUntil } from 'rxjs';
import { ReportProgressSingleton } from '../../helpers/report-progress.singleton';
import { CustomSnackBarComponent } from './custom-snack-bar/custom-snack-bar.component';

@Directive()
export abstract class CustomSnackBarReport implements OnDestroy {
  public readonly reportProgress = ReportProgressSingleton.getInstance();
  private readonly destroy$ = new Subject<void>();

  constructor(snackBar: MatSnackBar) {
    combineLatest([
      this.reportProgress.isFailed$,
      this.reportProgress.result$.pipe(startWith(null)),
    ])
      .pipe(
        takeUntil(this.destroy$),
        filter(([failed, result]) => failed && !!result)
      )
      .subscribe(([_, result]) => this.openSnackBar(result, snackBar));
  }

  openSnackBar(failedMessage: string | null, snackBar: MatSnackBar) {
    snackBar.openFromComponent(CustomSnackBarComponent, {
      data: failedMessage,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
