import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, Subject, takeUntil } from 'rxjs';
import { ReportProgress } from 'src/app/root/helpers/report-progress';
import { authenticateToken, saveToken } from '../ngrx/actions/token.actions';
import { getGithubAPIToken } from '../ngrx/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public readonly loginFormGroup = this.fb.group({
    authToken: ['', [Validators.required]],
  });

  public readonly authenticateReportProgress = new ReportProgress<string>();

  private destroy$ = new Subject<void>();
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(getGithubAPIToken)
      .pipe(
        filter((token) => !!token),
        takeUntil(this.destroy$)
      )
      .subscribe((token) =>
        this.store.dispatch(
          authenticateToken({
            token: token,
            reportProgress: this.authenticateReportProgress,
          })
        )
      );
  }

  get controls() {
    return this.loginFormGroup.controls;
  }

  authenticate() {
    if (this.loginFormGroup.invalid) {
      return;
    }

    const userToken: string = this.loginFormGroup.value.authToken;
    this.store.dispatch(
      saveToken({
        token: userToken?.trim(),
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
