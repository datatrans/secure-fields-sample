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
      <h1 className='mb-4'>Datatrans Secure Fields Demo</h1>

      <div className='flex items-end mb-4'>
        <label htmlFor='transactionId'>
          Transaction ID
          <input
            id='transactionId'
            type='tel'
            value={transactionId}
            className='block h-9 border px-2'
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
          <button className='bg-[#3eb55f] text-white ml-2 px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md' onClick={e =>{
            setData({
              ...data,
              transactionId
            })

            setSuccess(false)
          }}>Load SecureFields</button>
        </div>
      </div>

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
