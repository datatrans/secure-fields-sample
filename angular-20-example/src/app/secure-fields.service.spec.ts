/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecureFieldsService } from './secure-fields.service';

describe('Service: SecureFields', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecureFieldsService]
    });
  });

  it('should ...', inject([SecureFieldsService], (service: SecureFieldsService) => {
    expect(service).toBeTruthy();
  }));
});
