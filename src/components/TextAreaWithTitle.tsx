import React from 'react';
import { ErrorMessage } from './ErrorMessage';

interface TextAreaWithTitleProps {
    title: string;
    placeholder: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    showCharCount?: boolean;
    minLength?: number;
    maxLength?: number;
}

const TextAreaWithTitle: React.FC<TextAreaWithTitleProps> = ({
    title,
    placeholder,
    value,
    onChange,
    error,
    showCharCount = false,
    minLength,
    maxLength,
}) => {
    const currentLength = value?.length || 0;

    const getCharCountColor = () => {
        if (minLength && currentLength < minLength) return 'text-orange-500';
        if (maxLength && currentLength > maxLength) return 'text-red-500';
        return 'text-gray-500';
    };

    const getCharCountText = () => {
        if (minLength && maxLength) {
            return `${currentLength}/${maxLength} caracteres (mín. ${minLength})`;
        }
        if (minLength) {
            return `${currentLength} caracteres (mín. ${minLength})`;
        }
        if (maxLength) {
            return `${currentLength}/${maxLength} caracteres`;
        }
        return `${currentLength} caracteres`;
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">{title}</p>
                <ErrorMessage error={error} />
            </div>
            <textarea
                className={`w-full h-21 p-2 border-2 rounded-md text-sm text-gray-600 placeholder-gray-400 focus:outline-none resize-none border-gray-300 focus:border-primary-500`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
            />
            {showCharCount && (
                <div className="flex justify-end mt-1">
                    <p className={`text-xs ${getCharCountColor()}`}>
                        {getCharCountText()}
                    </p>
                </div>
            )}
        </div>
    );
};

export default TextAreaWithTitle;
