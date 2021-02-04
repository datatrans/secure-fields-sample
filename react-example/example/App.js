import React, { useState } from 'react'
import clx from 'classnames'

import Transaction from './Transaction'

import SecureFields from '../src'

// Styled input fields
import StyledFields from './fields'

export default function SecureFieldExample() {
  const [transactionId, setTransactionId] = useState('')
  const [paymentMethod, setPaymentMethod] = useState()
  const [isReady, setIsReady] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const handleChange = (data) => {
    let p = data.fields.cardNumber.paymentMethod
      ? data.fields.cardNumber.paymentMethod
      : false

    setError(false)
    setPaymentMethod(p)
  }

  return <div >
    <h1 style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 300 }}>Datatrans SecureFields Demo</h1>

    {/* Demo to get a transactionID */}
    <Transaction transactionId={transactionId} setTransactionId={setTransactionId} />

    <div className='col-half'>
      <SecureFields
        transactionId={transactionId}
        production={false /* Default: false */}
        fields={{
          cardNumber: 'card-number',
          cvv: 'cvv-number'
        }}
        onReady={() => { setIsReady(true) }}
        onSuccess={() => {}}
        onValidate={() => {}}
        onChange={(data) => handleChange(data)}
        onError={(data) => {
          setMessage(data)
          setError(true)
          setIsReady(true)
        }}
      />
      <StyledFields
        paymentMethod={paymentMethod}
        isReady={isReady}
        error={error}
      />
      {message && <div style={{maxWidth: '400px', margin: '20px auto'}}>
        <p className={clx({ error })}>{message}</p>
        </div>
      }
    </div>
  </div>
}
