import { useState, useEffect } from 'react'

export function Transaction({ data, setData }) {
  /**
   * THIS CODE IS FOR DEMO PURPOSE ONLY
   * Do not use this code in your project
   * All this should be handled by your server
   */
  const [merchantId, setMerchantId] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (merchantId && password) {
      setData({
        ...data,
        basicAuth: window.btoa(`${merchantId}:${password}`)
      })
    }
  }, [merchantId, password])

  return (
    <>
    <hr className='mt-8' />
      <h2 className='mt-8'>
        Follow belows step to get a new transactionId
      </h2>
      <h3 className='mt-4'>Step 1:</h3>
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
          className='mb-2'
          onChange={e => setMerchantId(e.target.value)}
        />
      </label>
      <label htmlFor='password'>
        Password
        <input
          id='password'
          type='text'
          value={password}
          className='mb-2'
          onChange={e => setPassword(e.target.value)}
        />
      </label>

      <label htmlFor='amount'>
        Amount in the currency's smallest unit (e.g. 1000 = 10CHF)
        <input
          id='amount'
          type='text'
          value={data.amount}
          className='mb-2'
          onChange={e =>
            setData({
              ...data,
              amount: e.target.value
            })
          }
        />
        <small>Set the amount to 0 for card registeration only</small>
      </label>
      <h3 className='mt-4'>Step 2:</h3>
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
          curl 'https://api.sandbox.datatrans.com/v1/transactions/secureFields' \<br />
          --header 'Authorization: Basic {data.basicAuth}' \<br />
          --header 'Content-Type: application/json' \<br />
          --data-raw '
          {JSON.stringify(
            {
              currency: 'CHF',
              amount: parseInt(data.amount, 10) ? parseInt(data.amount, 10) : undefined,
              returnUrl: window.location.href
            },
            null,
            ' '
          )}
          '
        </pre>
      </code>
    </>
  )
}
