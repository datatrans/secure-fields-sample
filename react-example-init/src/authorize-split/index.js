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
          <h2 className='mt-4'>Authorize transaction</h2>
          <p>
            <small>
              <a href='https://api-reference.datatrans.ch/#operation/authorize-split'>
                Documentation: Authorize an authenticated transaction
              </a>
            </small>
          </p>
          <code style={{ userSelect: 'all' }}>
            <pre className='bg-[#eaeaea] p-2 max-w-3xl text-sm'>
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
      <div className='mt-4'>
        <button className='bg-[#3eb55f] text-white px-4 py-1 font-semibold leading-6 text-sm' href='#' onClick={() => window.location.reload()}>
          Restart example
        </button>
      </div>
    </>
  )
}
