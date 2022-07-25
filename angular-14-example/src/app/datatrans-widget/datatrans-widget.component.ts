import { Component, OnInit, OnDestroy } from '@angular/core';
import { SecureFieldsService } from '../secure-fields.service';

@Component({
  selector: 'app-datatrans-widget',
  templateUrl: './datatrans-widget.component.html',
  styleUrls: ['./datatrans-widget.component.css']
})
export class DatatransWidgetComponent implements OnInit, OnDestroy {
  title = 'datatrans-widget';

  constructor(protected secureFieldsService: SecureFieldsService) { }

  expiry = '';

  ngOnInit(): void {
    this.secureFieldsService.init();
  }

  onSubmit(): void {
    this.secureFieldsService.submit();
  }

  expiryDateChange(event: any) {
    let val = event.target.value as string;
    if(val.length == 2 && event.key != "Backspace") {
      this.expiry += '/';
    }
  }

  ngOnDestroy(): void {
    this.secureFieldsService.destroy();
  }
}
