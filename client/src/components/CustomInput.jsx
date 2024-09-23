// CustomInput.js
import React from 'react';
import { useField } from 'formik';

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error;

  return (
    <div className="relative">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <input
        {...field}
        {...props}
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && <div className="text-red-500 text-sm mt-1">{meta.error}</div>}
    </div>
  );
};

export default CustomInput;
