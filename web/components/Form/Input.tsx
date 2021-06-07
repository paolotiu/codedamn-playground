import React from 'react';

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(({ label, name, ...props }: Props, ref) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="font-medium">
        {label || name}
      </label>
      <input name={name} {...props} className="w-full px-2 py-1 border rounded-sm" ref={ref} />
    </div>
  );
});

export default Input;
