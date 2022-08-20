import { createAction, props } from '@ngrx/store';
import { ReportProgressSingleton } from 'src/app/root/helpers/report-progress.singleton';

export const saveToken = createAction(
  '[Token] save token',
  props<{ token: string; reportProgress: ReportProgressSingleton }>()
);

export const tokenSaved = createAction(
  '[Token] token saved',
  props<{ token: string; reportProgress: ReportProgressSingleton }>()
);

export const authenticateToken = createAction(
  '[Token] authenticate token',
  props<{ token: string; reportProgress: ReportProgressSingleton }>()
);
export const tokenAuthenticationSuccessful = createAction(
  '[Token] token authentication successful'
);

export const tokenAuthenticationFailed = createAction(
  '[Token] token authentication failed'
);
