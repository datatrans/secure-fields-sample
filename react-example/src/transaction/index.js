import { useState, useEffect } from 'react'

export function Transaction({ transactionId, setTransactionId }) {
  /**
   * THIS CODE IS FOR DEMO PURPOSE ONLY
   * Do not use this code in your project
   * All this should be handled by your server
   */
  const [basicAuth, setBasicAuth] = useState('')
  const [merchantId, setMerchantId] = useState('')
  const [password, setPassword] = useState('')
  const [amount, setAmount] = useState(1000)

  const onClick = () => {
    setLoading(true)
  }

  useEffect(() => {
    if (merchantId && password) {
      setBasicAuth(window.btoa(`${merchantId}:${password}`))
    }
  }, [merchantId, password])

  return (
    <>
      <p className='bg-orange-300 p-2'>
        If you already have a transactionId, please head to Step 3 directly.
      </p>
      <h2 className='mt-4'>Step 1:</h2>
      <p>
        Fill in your basicAuth to complete the code example below:
        <br />
        <small>
          <a href='https://api-reference.datatrans.ch/#section/Authentication'>
            Documentation: Authentication
          </a>
        </small>
      </p>

      <label htmlFor='merchantId'>
        Datatrans MerchantId
        <input
          id='merchantId'
          type='text'
          value={merchantId}
          onChange={e => setMerchantId(e.target.value)}
        />
      </label>
      <label htmlFor='password'>
        Password
        <input
          id='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>

      <label htmlFor='amount'>
        Amount in the currency's smallest unit
        <br />
        (e.g. 1000 = 10CHF)
        <input id='amount' type='text' value={amount} onChange={e => setAmount(e.target.value)} />
      </label>
      <h2 className='mt-4'>Step 2:</h2>
      <p>
        Run this example on your server:
        <br />
        <small>
          <a href='https://api-reference.datatrans.ch/#tag/v1transactions'>
            Documentation: Initialize a transaction
          </a>
        </small>
      </p>
      <code style={{ userSelect: 'all' }}>
        <pre className='bg-[#eaeaea] p-2' style={{ maxWidth: '700px' }}>
          curl 'https://api.sandbox.datatrans.com/v1/transactions' \<br />
          --header 'Authorization: Basic {basicAuth}' \<br />
          --header 'Content-Type: application/json' \<br />
          --data-raw '
          {JSON.stringify(
            {
              currency: 'CHF',
              refno: 'react-secure-fields',
              amount: parseInt(amount, 10)
            },
            null,
            ' '
          )}
          '
        </pre>
      </code>
      <h2 className='mt-4'>Step 3:</h2>
      <p>
        Copy the transactionId from the call above:
        <br />
        Please note that a transactionId is only valid for 30 minutes.
      </p>
      <label htmlFor='transactionId'>
        Transaction ID
        <input
          id='transactionId'
          type='text'
          value={transactionId}
          onChange={e => setTransactionId(e.target.value)}
        />
      </label>
    </>
  )
}
