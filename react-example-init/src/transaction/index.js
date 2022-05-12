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
      <h2 className='mt-8'>
        How to get a Transaction ID?
      </h2>
      <p className='mt-4 mb-4'>
        Provide your authentication data to complete the example request below.
        <br />
        <small>
          <a href='https://api-reference.datatrans.ch/#section/Authentication'>
            Documentation: Authentication
          </a>
        </small>
      </p>

      <label htmlFor='merchantId' className='block'>
        <strong className='block'>Datatrans Merchant ID</strong>
        <input
          id='merchantId'
          type='text'
          value={merchantId}
          className='max-w-md'
          onChange={e => setMerchantId(e.target.value)}
        />
      </label>
      <label htmlFor='password' className='block mt-3'>
        <strong className='block'>Password</strong>
        <input
          id='password'
          type='text'
          value={password}
          className='max-w-md'
          onChange={e => setPassword(e.target.value)}
        />
      </label>

      <label htmlFor='amount' className='block mt-3'>
        <strong className='block'>Amount in the currency's smallest unit (e.g. 100 = 1CHF)</strong>
        <input
          id='amount'
          type='text'
          className='max-w-xs'
          value={data.amount}
          onChange={e =>
            setData({
              ...data,
              amount: e.target.value
            })
          }
          />
        <small className='text-slate-400 block mt-2'>
          Set the amount to 0 if you need to register a new credit card without performing a transaction at the same time.
        </small>
      </label>
      <h3 className='mt-8 mb-4'>Send the following request from your server:</h3>
      <code style={{ userSelect: 'all' }}>
        <pre className='bg-[#eaeaea] p-2 text-sm max-w-3xl'>
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
      <p>
        <small>
          <a href='https://api-reference.datatrans.ch/#tag/v1transactions'>
            Documentation: Initialize a transaction
          </a>
        </small>
      </p>
    </>
  )
}
