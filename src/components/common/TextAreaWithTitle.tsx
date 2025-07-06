import React from 'react';
import { ErrorMessage } from './ErrorMessage';

interface TextAreaWithTitleProps {
    title: string;
    placeholder: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    maxLength?: number;
    readOnly?: boolean;
}

const TextAreaWithTitle: React.FC<TextAreaWithTitleProps> = ({
    title,
    placeholder,
    value,
    onChange,
    error,
    maxLength,
    readOnly,
}) => {
    const currentLength = value?.length || 0;

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
    const textareaId = React.useId();

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label htmlFor={textareaId} className="text-sm text-gray-600">
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
            <textarea
                id={textareaId}
                className={`w-full h-21 p-2 border-2 rounded-md text-sm text-gray-600 placeholder-gray-400 focus:outline-none resize-none ${getBorderColor()}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                readOnly={readOnly}
            />
        </div>
    );
};

export default TextAreaWithTitle;
