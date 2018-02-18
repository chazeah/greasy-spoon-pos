import { TestBed, inject } from '@angular/core/testing';

import { OrderedItemService } from './ordered-item.service';

describe('OrderedItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderedItemService]
    });
  });

  it('should be created', inject([OrderedItemService], (service: OrderedItemService) => {
    expect(service).toBeTruthy();
  }));
});
