import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriceListModalComponent } from './add-price-list-modal.component';

describe('AddPriceListModalComponent', () => {
  let component: AddPriceListModalComponent;
  let fixture: ComponentFixture<AddPriceListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPriceListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPriceListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
