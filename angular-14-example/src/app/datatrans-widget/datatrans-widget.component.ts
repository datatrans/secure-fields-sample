import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ScriptService } from '../script.service';

@Component({
  selector: 'app-datatrans-widget',
  templateUrl: './datatrans-widget.component.html',
  styleUrls: ['./datatrans-widget.component.css']
})
export class DatatransWidgetComponent implements OnInit {
  title = 'poc-datatrans-widget';
  constructor(private scriptService: ScriptService) {}
  secureFields: any;
  transactionId = '';
  cardNumberResult = '';
  cvvResult = '';
  expiryResult = '';
  cardType = '';
  expiry = '';
  expiryYear = '';
  expiryMonth = '';

  ngOnInit(): void {
    this.scriptService.load(environment.production ? 'secure-fields' : 'secure-fields-test').then((data: any) => {
      this.initSecureFields();
    }).catch(error => console.log(error));
  }

  initSecureFields() {
      this.secureFields = new (window as any).SecureFields();
      this.secureFields.initTokenize(
        '1100007006', // Merchant Id
        {
          cardNumber: {
            placeholderElementId: 'card-number',
            inputType: 'tel'
          },
          cvv:  {
            placeholderElementId: 'cvv-number',
            inputType: 'tel'
          }
        },
        {
          // options...
        }
      );

      this.secureFields.on('ready', () => {
        console.log('secureFields Ready');
        // Set styles manually as they're inside an iframe and out of the scope of the parent's stylesheets
        this.secureFields.setStyle('cardNumber', 'height: 40px;');
        this.secureFields.focus('cardNumber');
        this.secureFields.setPlaceholder('cardNumber', '4242 4242 4242 4242');
        this.secureFields.setPlaceholder("cvv", "123");
      });

      this.secureFields.on("success", (data: any) => {
        if(data.transactionId) {
          this.transactionId = data.transactionId;
        }
      });

      this.secureFields.on('change', (data: any) => {
        // Fill epxiry date on card autocomplete
        if(!data.fields.cardNumber.paymentMethod) {
          this.cardType = 'Unknown';
        }
        else {
          this.cardType = data.fields.cardNumber.paymentMethod;
        }
      });

      this.secureFields.on('validate', (data: any) => {
        if (data.fields.cardNumber.valid) {
          this.cardNumberResult = 'Valid';
        } else {
          this.cardNumberResult = 'Invalid';
        }

        if (data.fields.cvv.valid) {
          this.cvvResult = 'Valid';
        } else {
          this.cvvResult = 'Invalid';
        }
      });
  }

  onSubmit(): void {
    this.secureFields.submit();
  }

  expiryDateChange(event: any) {
    let val = event.target.value as string;
    if(val.length == 2 && event.key != "Backspace") {
      this.expiry += '/';
    }
  }

}
