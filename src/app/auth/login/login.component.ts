import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReportProgress } from 'src/app/root/helpers/report-progress';
import { authenticateToken } from '../ngrx/actions/token.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public readonly loginFormGroup = this.fb.group({
    authToken: ['', [Validators.required]],
  });

  public readonly authenticateReportProgress = new ReportProgress();
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {}

  get controls() {
    return this.loginFormGroup.controls;
  }

  authenticate() {
    this.store.dispatch(
      authenticateToken({
        token: 'test',
        reportProgress: this.authenticateReportProgress,
      })
    );
  }
}
