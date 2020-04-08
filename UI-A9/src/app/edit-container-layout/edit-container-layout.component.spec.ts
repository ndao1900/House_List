import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContainerLayoutComponent } from './edit-container-layout.component';

describe('EditContainerLayoutComponent', () => {
  let component: EditContainerLayoutComponent;
  let fixture: ComponentFixture<EditContainerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContainerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContainerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
