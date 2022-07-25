/* tslint:disable:no-unused-variable */

import { ScriptService } from './script.service';

describe('Service: ScriptService', () => {
  let service: ScriptService;
  beforeEach(() => { service = new ScriptService(); });

  it('should load secure-fields-test', (done: DoneFn) => {
    service.load('secure-fields-test').then((data: any) => {
      expect(data[0].loaded).toBeTruthy();
      done();
    });
  });

  it('should load secure-fields', (done: DoneFn) => {
    service.load('secure-fields').then((data: any) => {
      expect(data[0].loaded).toBeTruthy();
      done();
    });
  });

  it('should load both', (done: DoneFn) => {
    service.load('secure-fields', 'secure-fields-test').then((data: any) => {
      expect(data[0].loaded).toBeTruthy();
      expect(data[1].loaded).toBeTruthy();
      done();
    });
  });
});
