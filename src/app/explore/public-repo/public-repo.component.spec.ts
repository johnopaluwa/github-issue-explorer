import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { Router } from '@angular/router';
import { MockComponents, MockDirectives } from 'ng-mocks';
import { of } from 'rxjs';
import {
  getComponent,
  getDebugElement,
} from 'src/app/root/helpers/data-test-finder';
import { TestSearch } from 'src/app/root/helpers/test-data';
import { HeaderAuthenticatedComponent } from 'src/app/root/modules/header-authenticated/header-authenticated.component';
import { PaginatorComponent } from 'src/app/root/modules/paginator/paginator.component';
import { ExploreService } from '../services/explore.service';
import { PublicRepoComponent } from './public-repo.component';

describe('PublicRepoComponent', () => {
  let component: PublicRepoComponent;
  let fixture: ComponentFixture<PublicRepoComponent>;
  let routerMock: Router;
  let exploreServiceMock: ExploreService;

  beforeEach(async () => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    exploreServiceMock = jasmine.createSpyObj('exploreServiceMock', [
      'getPublicRepoQuerySearch',
    ]);

    (
      exploreServiceMock.getPublicRepoQuerySearch as jasmine.Spy
    ).and.returnValue(of(TestSearch));

    await TestBed.configureTestingModule({
      declarations: [
        PublicRepoComponent,
        MockComponents(
          HeaderAuthenticatedComponent,
          MatCard,
          PaginatorComponent
        ),
        MockDirectives(MatCardTitle, MatCardSubtitle),
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ExploreService, useValue: exploreServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicRepoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show public repos on initial load', () => {
    fixture.detectChanges();
    expect(getDebugElement(fixture, 'data-go-xorm/xorm')).toBeTruthy();
    expect(getDebugElement(fixture, 'data-shu223/iOS8-Sampler')).toBeTruthy();
    expect(getDebugElement(fixture, 'data-kazupon/vue-validator')).toBeTruthy();
  });

  it('should load more data', () => {
    (exploreServiceMock.getPublicRepoQuerySearch as jasmine.Spy).and.callFake(
      (...arg: unknown[]) => {
        if (!!arg[2]) {
          const moreSearch = {
            ...TestSearch,
            nodes: [
              {
                ...TestSearch.nodes[1],
                nameWithOwner: 'go-xorm/xorm-load-more',
              },
            ],
          };

          return of(moreSearch);
        }

        return of(TestSearch);
      }
    );
    fixture.detectChanges();

    getComponent<PaginatorComponent>(fixture, 'data-paginator').forward.emit();
    fixture.detectChanges();

    expect(
      getDebugElement(fixture, 'data-go-xorm/xorm-load-more')
    ).toBeTruthy();
    expect(getDebugElement(fixture, 'data-go-xorm/xorm')).toBeFalsy();
    expect(getDebugElement(fixture, 'data-shu223/iOS8-Sampler')).toBeFalsy();
    expect(getDebugElement(fixture, 'data-kazupon/vue-validator')).toBeFalsy();
  });

  it('should go back to login', () => {
    fixture.detectChanges();
    getComponent<HeaderAuthenticatedComponent>(
      fixture,
      'data-change-token'
    ).changeToken.emit();
    fixture.detectChanges();
    expect(routerMock.navigate).toHaveBeenCalled();
  });
});
