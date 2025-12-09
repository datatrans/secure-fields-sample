export function Field({ fieldType, label, className, callback, children }) {
  return (
    <div className={className} onClick={() => callback()}>
      <label htmlFor={fieldType}>{label}</label>
      <div className='relative flex justify-between border py-1 px-2 mb-2'>
        <div className='h-10' id={fieldType}></div>
        <div className='h-10 flex items-center'>{children}</div>
      </div>
    </div>
  )
}
