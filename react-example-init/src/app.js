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
  const [transactionId, setTransactionId] = useState('')
  const styles = {}

  return (
    <div className='container mx-auto py-4'>
      <h1 className='mb-4'>Secure Fields for Datatrans Payment Gateway customers</h1>
      <form onSubmit={e => {
        e.preventDefault()

        setData({
          ...data,
          transactionId
        })

        setSuccess(false)
      }}>
        <div className='flex items-end mb-4 mt-4'>
          <label htmlFor='transactionId'>
            Transaction ID
            <input
              id='transactionId'
              type='text'
              value={transactionId}
              onChange={e => {
                setTransactionId(e.target.value)
                setData({
                  ...data,
                  transactionId: false
                })
                setSuccess(false)
              }}
            />
          </label>
          <div>
            <button type='submit' className='bg-[#3eb55f] text-white ml-2 px-4 py-1 font-semibold leading-6 text-sm'>Render Secure Fields</button>
          </div>
        </div>
      </form>
      <hr className='my-8' />

      {!data.transactionId && !success && <Transaction data={data} setData={setData} />}

      {data.transactionId && (
        <SecureFields
          transactionId={data.transactionId}
          fields={{
            cardNumber: {
              placeholderElementId: 'cardNumberPlaceholder',
              placeholder: 'Enter your card number',
              label: 'Card number'
            },
            cvv: {
              placeholderElementId: 'cvvPlaceholder',
              inputType: 'tel',
              placeholder: 'Enter your CVV',
              label: 'CVV'
            }
          }}
          options={{ styles }}
          onReady={() => {}}
          onValidate={() => {}}
          onClear={() => {}}
          onChange={() => {}}
          onError={() => {}}
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
