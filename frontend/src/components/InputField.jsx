import React from 'react'

export default function InputField({labelName, inputType, name, onChangeName, placeholder, disabled}) {
  return (
    <div className='mt-5'>
      <label>
        <p>{labelName}</p>
        <input type={inputType} 
        name={name}
        className='w-full h-8 border'
        required
        onChange={(e) => onChangeName(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        />
      </label>
    </div>
  )
}
