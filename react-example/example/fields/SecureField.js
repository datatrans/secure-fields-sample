import React from 'react'
import PropTypes from 'prop-types'

const SecureField = ({ fieldType, label, customClass, callback, children }) => (
  <div id={fieldType + '-number-container'} className={customClass} onClick={() => callback()}>
    <label htmlFor={fieldType + '-number'}>{label}</label>
    <div className="secure-field--input-container" style={{height: '40px'}}>
      <div className="secure-field--input" id={fieldType + '-number'}></div>
      <div className="secure-field--actions">
        <span className={'secure-field--action secure-field--action__' + fieldType + '-icon'}>
          <span className={'secure-field--action-' + fieldType + '-wrap'}>
            {children}
          </span>
        </span>
      </div>
    </div>
  </div>
)

SecureField.propTypes = {
  fieldType: PropTypes.string,
  label: PropTypes.string,
  customClass: PropTypes.string,
  callback: PropTypes.func,
  children: PropTypes.array
}

export default SecureField
