import { Component } from '@angular/core';
import { ReportProgressSingleton } from './root/helpers/report-progress.singleton';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'github-issue-explorer';

  public readonly reportProgress = ReportProgressSingleton.getInstance();
}
