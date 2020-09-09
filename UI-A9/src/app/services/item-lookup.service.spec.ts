import { TestBed } from '@angular/core/testing';

import { ItemLookupService } from './item-lookup.service';

describe('ItemLookupService', () => {
  let service: ItemLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
