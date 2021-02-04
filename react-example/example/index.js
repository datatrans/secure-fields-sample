import React from 'react'
import ReactDom from 'react-dom'

import App from './App'

import SecureFields from '../src'

ReactDom.render(
  <SecureFields.Provider>
    <App />
  </SecureFields.Provider>,
  document.getElementById('app')
)
