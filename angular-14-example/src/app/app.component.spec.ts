import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DatatransWidgetComponent } from './datatrans-widget/datatrans-widget.component';
import { SecureFieldsService } from './secure-fields.service';

@Injectable()
class MockSecureFieldsService extends SecureFieldsService {
  override destroy(): void {
    return;
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DatatransWidgetComponent
      ],
      providers: [ SecureFieldsService ]
    });

    TestBed.overrideComponent(
      DatatransWidgetComponent,
      { set: { providers: [{ provide: SecureFieldsService, useClass: MockSecureFieldsService }] } }
    );

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
