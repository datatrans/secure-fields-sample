import React, { useState } from 'react'

import Transaction from './Transaction'

import SecureFields from '../src'

// Styled input fields
import StyledFields from './fields'

export default function SecureFieldExample() {
  const [transactionId, setTransactionId] = useState('')

  return <div>
    <h1 style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 300 }}>Datatrans SecureFields Demo</h1>
    {/* Demo to get a transactionID */}
    {!transactionId && <Transaction transactionId={transactionId} setTransactionId={setTransactionId} />}

    {transactionId && <div>
      <SecureFields
        transactionId={transactionId}
        production={false /* Default: false */}
        fields={{
          cardNumber: 'card-number',
          cvv: 'cvv-number'
        }}
        onSuccess={() => {}}
        onValidate={() => {}}
        onChange={(data) => { console.log(data) }}
      />
      <StyledFields />
    </div>}

  </div>
}
