import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericInputPanelComponent } from './generic-input-panel.component';

describe('GenericInputPanelComponent', () => {
  let component: GenericInputPanelComponent;
  let fixture: ComponentFixture<GenericInputPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericInputPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericInputPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
