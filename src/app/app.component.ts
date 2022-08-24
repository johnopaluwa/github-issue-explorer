import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBarReport } from './root/modules/ng-material/custom-snack-bar-report';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends CustomSnackBarReport implements OnInit {
  title = 'github-issue-explorer';

  constructor(snackBar: MatSnackBar) {
    super(snackBar);
  }

  ngOnInit(): void {}
}
