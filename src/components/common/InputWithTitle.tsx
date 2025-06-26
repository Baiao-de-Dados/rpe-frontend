import React from 'react';
import { ErrorMessage } from './ErrorMessage';

interface InputWithTitleProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string;
    error?: string;
    maxLength?: number;
}

const InputWithTitle: React.FC<InputWithTitleProps> = ({
    title,
    error,
    maxLength,
    value = '',
    onChange,
    ...props
}) => {
    const currentLength = typeof value === 'string' ? value.length : 0;

    const getCharCountColor = () => {
        if (maxLength && currentLength >= maxLength) return 'text-red-500';
        return 'text-gray-500';
    };

    const getBorderColor = () => {
        if (maxLength && currentLength >= maxLength) return 'border-red-500';
        if (error) return 'border-red-500';
        return 'border-gray-300 focus:border-primary-500';
    };

    const shouldShowCounter = maxLength && currentLength >= maxLength;
    const inputId = React.useId();

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label htmlFor={inputId} className="text-sm text-gray-600">
                    {title}
                </label>
                <div className="flex items-center gap-2">
                    {shouldShowCounter && (
                        <p className={`text-xs ${getCharCountColor()}`}>
                            {currentLength}/{maxLength}
                        </p>
                    )}
                    <ErrorMessage error={error} />
                </div>
            </div>
            <input
                id={inputId}
                className={`w-full h-10 p-2 border-2 rounded-md text-sm text-gray-600 placeholder-gray-400 focus:outline-none ${getBorderColor()}`}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                {...props}
            />
        </div>
    );
};

export default InputWithTitle;
