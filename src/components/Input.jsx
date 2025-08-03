import React, { forwardRef } from 'react';

const Input = forwardRef(function Input(
  {
    label,
    type = 'text',
    className = '',
    ...props
  },
  ref
) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="inline-block mb-1 pl-1 text-sm text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
});

export default Input;
