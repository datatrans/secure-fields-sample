import { AuthorizeSplit } from './authorize-split'
import { SecureFields } from './securefields'
import { Transaction } from './transaction'
import { useState } from 'react'

export function App() {
  const [data, setData] = useState({
    amount: 1000,
    refno: 'react-secure-fields',
    basicAuth: '{{basicAuth}}'
  })

  const [success, setSuccess] = useState()
  const styles = {}

  return (
    <div className='container mx-auto py-4'>
      <h1>Datatrans SecureFields Demo</h1>

      {!data.transactionId && !success && <Transaction data={data} setData={setData} />}

      {data.transactionId && (
        <SecureFields
          transactionId={data.transactionId}
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
          onSuccess={id => {
            setData({
              ...data,
              transactionId: ''
            })
            setSuccess(id)
          }}
        />
      )}

      {success && <AuthorizeSplit transactionId={success} data={data} setData={setData} />}
    </div>
  )
}
