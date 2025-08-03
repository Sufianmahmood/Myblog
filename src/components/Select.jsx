import React, { useId } from 'react';

const Select = React.forwardRef(function Select(
  { options = [], label, className = '', ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block mb-1 text-sm font-medium">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options.map((option, index) => (
          <option key={index} value={option?.value ?? option}>
            {option?.label ?? option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
