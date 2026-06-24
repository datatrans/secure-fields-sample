import { Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { ScriptService } from './script.service';

@Injectable({
  providedIn: 'root',
})
export class SecureFieldsService {
  transactionId = signal<string | undefined>(undefined);
  cardType = signal<string | undefined>(undefined);
  cardNumberResult = signal<string | undefined>(undefined);
  cvvResult = signal<string | undefined>(undefined);

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
        this.transactionId.set(data.transactionId);
      }
    });

    this.secureFields.on('change', (data: any) => {
      // Fill expiration date date on card autocomplete
      if (!data.fields.cardNumber.paymentMethod) {
        this.cardType.set('Unknown');
      } else {
        this.cardType.set(data.fields.cardNumber.paymentMethod);
      }
    });

    this.secureFields.on('validate', (data: any) => {
      if (data.fields.cardNumber.valid) {
        this.cardNumberResult.set('Valid');
      } else {
        this.cardNumberResult.set('Invalid');
      }

      if (data.fields.cvv.valid) {
        this.cvvResult.set('Valid');
      } else {
        this.cvvResult.set('Invalid');
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
