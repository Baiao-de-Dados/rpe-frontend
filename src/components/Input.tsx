import type React from 'react';
import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
    className = '',
    error,
    leftIcon,
    rightIcon,
    disabled = false,
    ...props
}) => {
    return (
        <div className="w-full">
            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8b949e] pointer-events-none">
                        {leftIcon}
                    </div>
                )}
                <input
                    className={cn(
                        'w-full h-[6vh] px-3 py-2 bg-gray-100  rounded-[10px]',
                        'text-sm text-gray-500 placeholder:text-[#8b949e]',
                        'focus:outline-none focus:ring-1 focus:border-gray-500',
                        'disabled:bg-[#21262d] disabled:text-[#8b949e] disabled:cursor-not-allowed',
                        'transition-colors duration-200',
                        leftIcon && 'pl-10',
                        rightIcon && 'pr-10',
                        error &&
                            'border-[#da3633] focus:border-[#da3633] focus:ring-[#da3633]',
                        className,
                    )}
                    disabled={disabled}
                    {...props}
                />
                {rightIcon && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8b949e] pointer-events-none">
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && <p className="mt-1 text-sm text-[#da3633]">{error}</p>}
        </div>
    );
};

export default Input;
