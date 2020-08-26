import React from 'react'
import ReactDOM from 'react-dom'

import SecureFields from '../src'

const App = <>
  <h1 style={{ fontFamily: '"Volte-Medium", "Helvetica Neue", Helvetica, Arial', color: '#213d62' }}>Datatrans SecureFields</h1>
  <h2 style={{ fontFamily: '"Volte-Medium", "Helvetica Neue", Helvetica, Arial', color: '#213d62' }}>with React</h2>

  <SecureFields config={{
    merchantID: '1100007006',
    fields:{
      cardNumber: {
        placeholderElementId: 'card-number',
        inputType: 'tel'
      },
      cvv: {
        placeholderElementId: 'cvv-number',
        inputType: 'tel'
      }
    },
    options: {}
  }} />
</>

ReactDOM.render(
  App,
  document.getElementById('app')
);
