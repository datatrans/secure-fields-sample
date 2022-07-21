import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScriptService } from '../script.service';

@Component({
  selector: 'app-datatrans-widget',
  templateUrl: './datatrans-widget.component.html',
  styleUrls: ['./datatrans-widget.component.css']
})
export class DatatransWidgetComponent implements OnInit, OnDestroy {
  title = 'poc-datatrans-widget';
  constructor(private scriptService: ScriptService) {}
  secureFields: any;
  transactionId = '';
  result = '';
  cardType = '';

  ngOnInit(): void {
    this.scriptService.load('secure-fields').then((data: any) => {
      console.log('Loaded Script data:' + data.toString());
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
      });

      this.secureFields.on("success", (data: any) => {
        if(data.transactionId) {
          this.transactionId = data.transactionId;
        }
      });

      this.secureFields.on('change', (data: any) => {
        console.log('secureFields Changed');
        if(!data.fields.cardNumber.paymentMethod) {
          this.cardType = 'Unknown';
        }
        else {
          this.cardType = data.fields.cardNumber.paymentMethod;
        }
      });

      this.secureFields.on('validate', (data: any) => {
        if (data.fields.cardNumber.valid) {
          this.result = 'Valid';
        } else {
          this.result = 'Invalid';
        }
      });
  }

  onSubmit(): void {
    this.secureFields.submit();
  }

  ngOnDestroy(): void {
    this.secureFields.destroy();
  }
}
