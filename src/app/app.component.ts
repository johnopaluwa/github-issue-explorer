import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ReportProgressSingleton } from './root/helpers/report-progress.singleton';
import { CustomSnackBarReport } from './root/modules/ng-material/custom-snack-bar-report';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends CustomSnackBarReport implements OnInit {
  title = 'github-issue-explorer';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  public readonly reportProgress = ReportProgressSingleton.getInstance();

  constructor(snackBar: MatSnackBar) {
    super(snackBar);
  }

  ngOnInit(): void {}
}
