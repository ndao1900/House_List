import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListEntryRowComponent } from './item-list-entry-row.component';

describe('ItemListEntryRowComponent', () => {
  let component: ItemListEntryRowComponent;
  let fixture: ComponentFixture<ItemListEntryRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemListEntryRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListEntryRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
