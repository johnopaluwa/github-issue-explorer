import { ReportProgress } from './report-progress';

export class ReportProgressSingleton extends ReportProgress {
  private static instance: ReportProgressSingleton;

  public static getInstance() {
    if (!ReportProgressSingleton.instance) {
      ReportProgressSingleton.instance = new ReportProgressSingleton();
    }
    return ReportProgressSingleton.instance;
  }
}
