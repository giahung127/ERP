import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductToPriceListModalComponent } from './add-product-to-price-list-modal.component';

describe('AddProductToPriceListModalComponent', () => {
  let component: AddProductToPriceListModalComponent;
  let fixture: ComponentFixture<AddProductToPriceListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductToPriceListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductToPriceListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
