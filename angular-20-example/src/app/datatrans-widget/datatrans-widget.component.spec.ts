/* tslint:disable:no-unused-variable */
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecureFieldsService } from '../secure-fields.service';
import { DatatransWidgetComponent } from './datatrans-widget.component';

@Injectable()
class MockSecureFieldsService extends SecureFieldsService {
  override destroy(): void {
    return;
  }
}

describe('DatatransWidgetComponent', () => {
  let component: DatatransWidgetComponent;
  let fixture: ComponentFixture<DatatransWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatransWidgetComponent ],
      providers: [ SecureFieldsService ]
    });

    TestBed.overrideComponent(
      DatatransWidgetComponent,
      { set: { providers: [{ provide: SecureFieldsService, useClass: MockSecureFieldsService }] } }
    );

    fixture = TestBed.createComponent(DatatransWidgetComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
