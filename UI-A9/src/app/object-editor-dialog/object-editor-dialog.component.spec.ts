import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectEditorDialogComponent } from './object-editor-dialog.component';

describe('ObjectEditorDialogComponent', () => {
  let component: ObjectEditorDialogComponent;
  let fixture: ComponentFixture<ObjectEditorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectEditorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
