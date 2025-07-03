import React from 'react';
import { ErrorMessage } from './ErrorMessage';

interface InputWithTitleProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string;
    error?: string;
    maxLength?: number;
    labelPosition?: 'top' | 'left';
    inputType?: 'text' | 'number';
    onlyInteger?: boolean;
    width?: string;
    height?: string;
}

const InputWithTitle: React.FC<InputWithTitleProps> = ({
    title,
    error,
    maxLength,
    value = '',
    onChange,
    labelPosition = 'top',
    inputType = 'text',
    onlyInteger = false,
    className,
    width,
    height,
    ...props
}) => {
    const currentLength = typeof value === 'string' ? value.length : 0;

    const getCharCountColor = () => {
        if (maxLength && currentLength >= maxLength) return 'text-red-500';
        return 'text-gray-500';
    };

    const getBorderColor = () => {
        if (maxLength && currentLength >= maxLength)
            return 'border-red-500 focus:border-red-500';
        if (error) return 'border-red-500 focus:border-red-500';
        return 'border-gray-300 focus:border-primary-500';
    };

    const shouldShowCounter = !!maxLength && currentLength >= maxLength;
    const inputId = React.useId();

    const baseInputClass =
        'w-full p-2 border-2 rounded-md text-sm text-gray-600 placeholder-gray-400 focus:outline-none';
    let inputClass = `${baseInputClass} ${getBorderColor()}`;
    if (inputType === 'number') {
        inputClass +=
            ' [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';
    }
    if (className) {
        inputClass = `${className} ${inputClass}`;
    }

    const style: React.CSSProperties = {};
    if (width) style.width = isNaN(Number(width)) ? width : `${width}rem`;
    if (height) style.height = isNaN(Number(height)) ? height : `${height}rem`;

    const numberInputProps: React.InputHTMLAttributes<HTMLInputElement> =
        inputType === 'number'
            ? {
                  inputMode: onlyInteger ? 'numeric' : 'decimal',
                  pattern: onlyInteger ? '[0-9]*' : undefined,
                  step: onlyInteger ? 1 : 'any',
                  style: { MozAppearance: 'textfield', ...style },
              }
            : { style };

    if (labelPosition === 'left') {
        return (
            <div className="flex items-center gap-2">
                <label
                    htmlFor={inputId}
                    className="text-sm text-gray-600 whitespace-nowrap"
                >
                    {title}
                </label>
                <input
                    id={inputId}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    className={inputClass}
                    {...props}
                    {...numberInputProps}
                />
                {shouldShowCounter && (
                    <p className={`text-xs ${getCharCountColor()}`}>
                        {currentLength}/{maxLength}
                    </p>
                )}
                <ErrorMessage error={error} />
            </div>
        );
    }

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
                type={inputType}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                className={inputClass}
                {...props}
                {...numberInputProps}
            />
        </div>
    );
};

export default InputWithTitle;
