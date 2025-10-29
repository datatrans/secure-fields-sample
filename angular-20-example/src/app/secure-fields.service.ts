import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ScriptService } from './script.service';

@Injectable({
  providedIn: 'root',
})
export class SecureFieldsService {
  transactionId: any;
  cardType: string | undefined;
  cardNumberResult: string | undefined;
  cvvResult: string | undefined;

  constructor(private scriptService: ScriptService) {}
  secureFields: any;

  init() {
    this.scriptService
      .load(environment.production ? 'secure-fields' : 'secure-fields-test')
      .then((data: any) => {
        this.initSecureFields();
      })
      .catch((error) => console.log(error));
  }

  initSecureFields() {
    this.secureFields = new (window as any).SecureFields();
    this.secureFields.initTokenize(
      '1100007006', // Merchant Id
      {
        cardNumber: {
          placeholderElementId: 'card-number',
          inputType: 'tel',
        },
        cvv: {
          placeholderElementId: 'cvv-number',
          inputType: 'tel',
        },
      }
    );

    this.secureFields.on('ready', () => {
      console.log('secureFields Ready');
      // Set styles manually as they're inside an iframe and out of the scope of the parent's stylesheets
      this.secureFields.setStyle('cardNumber', 'height: 40px;');
      this.secureFields.focus('cardNumber');
      this.secureFields.setPlaceholder('cardNumber', '4242 4242 4242 4242');
      this.secureFields.setPlaceholder('cvv', '123');
    });

    this.secureFields.on('success', (data: any) => {
      if (data.transactionId) {
        this.transactionId = data.transactionId;
      }
    });

    this.secureFields.on('change', (data: any) => {
      // Fill expiration date date on card autocomplete
      if (!data.fields.cardNumber.paymentMethod) {
        this.cardType = 'Unknown';
      } else {
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

  submit() {
    this.secureFields.submit();
  }

  destroy() {
    this.secureFields.destroy();
  }
}
