import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCustomItemComponent } from './grid-custom-item.component';

describe('GridCustomItemComponent', () => {
  let component: GridCustomItemComponent;
  let fixture: ComponentFixture<GridCustomItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCustomItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCustomItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
