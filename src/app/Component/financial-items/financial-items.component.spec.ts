import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialItemsComponent } from './financial-items.component';

describe('FinancialItemsComponent', () => {
  let component: FinancialItemsComponent;
  let fixture: ComponentFixture<FinancialItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
