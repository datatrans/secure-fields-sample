import React, { useState, useEffect } from 'react'

export default function Transaction({ transactionId, setTransactionId }) {
  const [basicAuth, setBasicAuth] = useState('')
  const [merchantId, setMerchantId] = useState('')
  const [password, setPassword] = useState('')
  const [amount, setAmount] = useState(1000)

  useEffect(() => {
    if (merchantId && password) {
      setBasicAuth(window.btoa(`${merchantId}:${password}`))
    }
  }, [merchantId, password])

  return <div className='col-half'>
    <div>
      <h2>Step 1:</h2>
      <p>Fill in your basicAuth to complete the code example below:<br/>
        <small><a href="https://api-reference.datatrans.ch/#section/Authentication">Documentation: Authentication</a></small>
      </p>

      <label htmlFor='merchantId'>
        Datatrans MerchantId
        <input id='merchantId' type='text' value={merchantId} onChange={(e) => setMerchantId(e.target.value)} />
      </label>
      <label htmlFor='password'>
        Password
        <input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      <label htmlFor='amount'>
        Amount in the currency&lsquo;s smallest unit<br/>(e.g. 1000 = 10CHF)
        <input id='amount' type='text' value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <h2>Step 2:</h2>
      <p>Run this example on your server:<br/>
        <small><a href="https://api-reference.datatrans.ch/#tag/v1transactions">Documentation: Initialize a transaction</a></small></p>
      <code style={{ userSelect: 'all' }}>
        <pre style={{ maxWidth: '700px' }}>
        curl &apos;https://api.sandbox.datatrans.com/v1/transactions&apos; \<br/>
          --header &apos;Authorization: Basic {basicAuth}&apos; \<br/>
          --header &apos;Content-Type: application/json&apos; \<br/>
          --data-raw &apos;{JSON.stringify({
            currency: 'CHF',
            refno: 'react-light-box',
            amount: parseInt(amount, 10),
          }, null, ' ')}&apos;
        </pre>
      </code>
      <h2>Step 3:</h2>
      <p>Copy the transactionId from the call above:<br/>Please note that a transactionId is only valid htmlFor 30 minutes.</p>
      <label htmlFor='transactionId'>
        Transaction ID
        <input id='transactionId' type='text' value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
      </label>
    </div>
  </div>
}
