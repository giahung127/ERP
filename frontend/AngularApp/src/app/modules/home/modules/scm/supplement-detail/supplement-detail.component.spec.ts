import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementDetailComponent } from './supplement-detail.component';

describe('SupplementDetailComponent', () => {
  let component: SupplementDetailComponent;
  let fixture: ComponentFixture<SupplementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplementDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
