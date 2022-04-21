import { useState, useEffect } from 'react'

export function AuthorizeSplit({ transactionId, data, setData }) {
  /**
   * THIS CODE IS FOR DEMO PURPOSE ONLY
   * Do not use this code in your project
   * All this should be handled by your server
   */
  return (
    <>
      <p className='mt-4 text-[#3eb55f]'>
      {!parseInt(data.amount, 10) ? 'Credit card successfully registered' : 'Payment data submitted successfully.'}
      </p>
      {!!parseInt(data.amount, 10) && (
        <>
          <h2 className='mt-4'>Step 4:</h2>
          <p>
            <small>
              <a href='https://api-reference.datatrans.ch/#operation/authorize-split'>
                Documentation: Authorize an authenticated transaction
              </a>
            </small>
          </p>
          <code style={{ userSelect: 'all' }}>
            <pre className='bg-[#eaeaea] p-2' style={{ maxWidth: '700px' }}>
              curl 'https://api.sandbox.datatrans.com/v1/transactions/{transactionId}/authorize' \
              <br />
              --header 'Authorization: Basic {data.basicAuth}' \<br />
              --header 'Content-Type: application/json' \<br />
              --data-raw '
              {JSON.stringify(
                {
                  refno: data.refno,
                  amount: data.amount,
                  autoSettle: true
                },
                null,
                ' '
              )}
              '
            </pre>
          </code>
        </>
      )}
      <p className='bg-orange-300 p-2 mt-4'>
        Add a <strong>new</strong> transactionId to restart the example
      </p>
    </>
  )
}
