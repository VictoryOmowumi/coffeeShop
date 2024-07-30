// CustomInput.js
import React from 'react';

const CustomInput = ({ field, form, type = 'text', placeholder, ...props }) => {
  const { name } = field;
  const error = form.errors[name] && form.touched[name];

  return (
    <div className="relative">
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${
          error ? 'border-red-500' : ''
        }`}
        {...props}
      />
      {error && (
        <div className="absolute top-full text-red-500 text-sm mt-1">{form.errors[name]}</div>
      )}
    </div>
  );
};

export default CustomInput;
