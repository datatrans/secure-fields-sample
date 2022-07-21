/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScriptServiceService } from './script-service.service';

describe('Service: ScriptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScriptServiceService]
    });
  });

  it('should ...', inject([ScriptServiceService], (service: ScriptServiceService) => {
    expect(service).toBeTruthy();
  }));
});
