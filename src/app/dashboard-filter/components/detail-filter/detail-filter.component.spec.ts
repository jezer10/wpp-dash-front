import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFilterComponent } from './detail-filter.component';

describe('DetailFilterComponent', () => {
  let component: DetailFilterComponent;
  let fixture: ComponentFixture<DetailFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
