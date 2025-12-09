import React from 'react'

export default function SecureField({ fieldType, label, customClass, callback, children }) {
  return <div id={fieldType + '-number-container'} className={customClass} onClick={() => callback()}>
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
}
