import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGridItemPanelComponent } from './edit-grid-item-panel.component';

describe('EditGridItemPanelComponent', () => {
  let component: EditGridItemPanelComponent;
  let fixture: ComponentFixture<EditGridItemPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGridItemPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGridItemPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
