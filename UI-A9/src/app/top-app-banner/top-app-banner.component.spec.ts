import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAppBannerComponent } from './top-app-banner.component';

describe('TopAppBannerComponent', () => {
  let component: TopAppBannerComponent;
  let fixture: ComponentFixture<TopAppBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAppBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAppBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
