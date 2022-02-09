import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatedComponent } from './navigated.component';

describe('NavigatedComponent', () => {
  let component: NavigatedComponent;
  let fixture: ComponentFixture<NavigatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
