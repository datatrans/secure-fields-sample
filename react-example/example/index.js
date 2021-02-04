import React from 'react'
import ReactDom from 'react-dom'

import App from './App'

import SecureFieldsProvider from '../src/Provider'

ReactDom.render(
  <SecureFieldsProvider>
    <App />
  </SecureFieldsProvider>,
  document.getElementById('app')
)
