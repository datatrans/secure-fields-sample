import { SecureFields } from './securefields'
import { Transaction } from './transaction'
import { useState } from 'react'

export function App() {
  const [transactionId, setTransactionId] = useState()
  const styles = {}

  return (
    <div className='container mx-auto py-4'>
      <h1>Datatrans SecureFields Demo</h1>
      {!transactionId && (
        <Transaction transactionId={transactionId} setTransactionId={setTransactionId} />
      )}
      {transactionId && (
        <SecureFields
          transactionId={transactionId}
          fields={{
            cardNumber: {
              placeholderElementId: 'cardNumberPlaceholder',
              placeholder: 'enter your card number',
              label: 'Card number'
            },
            cvv: {
              placeholderElementId: 'cvvPlaceholder',
              inputType: 'tel',
              placeholder: 'enter your cvv',
              label: 'CVV'
            }
          }}
          options={{ styles }}
        />
      )}
    </div>
  )
}
