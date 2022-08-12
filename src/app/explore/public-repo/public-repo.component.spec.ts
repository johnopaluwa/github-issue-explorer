import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicRepoComponent } from './public-repo.component';

describe('PublicRepoComponent', () => {
  let component: PublicRepoComponent;
  let fixture: ComponentFixture<PublicRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicRepoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
