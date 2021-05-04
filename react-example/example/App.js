import React, { useState } from 'react'

import Transaction from './Transaction'

import SecureFields from '../src'

// Styled input fields
import StyledFields from './fields'

export default function SecureFieldExample() {
  const [transactionId, setTransactionId] = useState('')
  const [paymentMethod, setPaymentMethod] = useState()
  const [isReady, setIsReady] = useState(false)
  const [message, setMessage] = useState()
  const [error, setError] = useState(false)

  const handleChange = (data) => {
    let p = data.fields.cardNumber.paymentMethod
      ? data.fields.cardNumber.paymentMethod
      : false

    setError(false)
    setPaymentMethod(p)
  }

  const handleValidate = (data) => {
    if (!data.fields.cardNumber.valid) {
      setError('card')
    }

    if (!data.fields.cvv.valid) {
      setError('cvv')
    }
  }

  const handleSuccess = (data) => {
    if (data.transactionId) {
      setMessage(<div>
        <p className='message success'>Data submitted successfully</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><b>Transaction #</b> {data.transactionId}</li>
          <li><b>Card Brand:</b> {data.cardInfo.brand}</li>
          <li><b>Card Type:</b> {data.cardInfo.type}</li>
          <li><b>Card Country:</b> {data.cardInfo.country}</li>
          <li><b>Card Issuer:</b> {data.cardInfo.issuer}</li>
          <li><b>Card Usage:</b> {data.cardInfo.usage}</li>
        </ul>
      </div>)
    } else if (data.error) {
      setMessage(<p className='message error'>{data.error}</p>)
      setError(true)
    }
  }

  return <div >
    <h1 style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 300 }}>Datatrans SecureFields Demo</h1>

    {/* Demo to get a transactionID */}
    <Transaction transactionId={transactionId} setTransactionId={setTransactionId} />

    {transactionId && <div style={{ float: 'left', padding: '0 20px', maxWidth: '400px', position: 'relative' }}>
      <SecureFields
        transactionId={transactionId}
        production={false /* Default: false */}
        fields={{
          cardNumber: 'card-number',
          cvv: 'cvv-number'
        }}
        onReady={() => { setIsReady(true) }}
        onSuccess={handleSuccess}
        onValidate={handleValidate}
        onChange={handleChange}
        onError={(data) => {
          if (data.error) {
            setMessage(<p className='message error'>{data.error}</p>)
          } else {
            setMessage(<p className='message error'>{data}</p>)
          }
          setError(true)
          setIsReady(true)
        }}
      />
      <StyledFields
        paymentMethod={paymentMethod}
        isReady={isReady}
        error={error}
      />
      {message && message}
    </div>}
  </div>
}
