import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export default function Input({
    label,
    error,
    icon,
    className = '',
    ...props
}: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={props.id}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    className={`
            w-full px-4 py-3 rounded-lg border transition-colors duration-200
            ${icon ? 'pl-10' : 'pl-4'}
            ${
                error
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-primary focus:ring-primary-400'
            }
            bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
