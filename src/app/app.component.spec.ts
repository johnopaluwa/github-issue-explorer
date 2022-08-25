import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { MockComponent, MockDirective } from 'ng-mocks';
import { AppComponent } from './app.component';
import { getElement } from './root/helpers/data-test-finder';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const matSnackBarMock = jasmine.createSpyObj('MatSnackBar', [
    'openFromComponent',
  ]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(MatProgressBar),
        MockDirective(RouterOutlet),
      ],
      providers: [{ provide: MatSnackBar, useValue: matSnackBarMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should show progress bar when loading ', () => {
    component.reportProgress.inProgress();
    fixture.detectChanges();

    const result = getElement<HTMLElement>(fixture, 'progress-bar');

    expect(result.className).toContain('progress--visible');
  });
});
