import { TestBed } from '@angular/core/testing';

import { GenericInputPanelService } from './generic-input-panel.service';

describe('GenericInputPanelService', () => {
  let service: GenericInputPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericInputPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
