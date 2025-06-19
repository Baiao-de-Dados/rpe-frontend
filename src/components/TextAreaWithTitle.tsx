import React from 'react';

interface TextAreaWithTitleProps {
    title: string;
    placeholder: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaWithTitle: React.FC<TextAreaWithTitleProps> = ({
    title,
    placeholder,
    value,
    onChange,
}) => {
    return (
        <div>
            <p className="text-sm text-gray-600 mb-2">{title}</p>
            <textarea
                className="w-full h-21 p-2 border-2 border-gray-300 rounded-md text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:border-primary-500 resize-none"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            ></textarea>
        </div>
    );
};

export default TextAreaWithTitle;
