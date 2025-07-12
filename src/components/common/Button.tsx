import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'link' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children: ReactNode;
}

export default function Button({ variant = 'primary', size = 'md',isLoading = false, children, disabled, className = '', ...props }: ButtonProps) {

    const base =
        'font-semibold rounded-lg transform transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:cursor-pointer';

    const variants = {
        primary:
            'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl',
        secondary:
            'bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl',
        outline:
            'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
        link: 'text-primary-500 hover:text-primary-700 p-0 shadow-none hover:shadow-none font-bold',
        danger: 'bg-error-500 hover:bg-error-600 text-white shadow-lg hover:shadow-xl',
    };

    const sizes = {
        sm: variant === 'link' ? 'text-sm' : 'px-4 py-2 text-sm',
        md: variant === 'link' ? 'text-base' : 'px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base',
        lg: variant === 'link' ? 'text-lg' : 'px-8 py-4 text-lg',
    };

    return (
        <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled || isLoading} {...props}>
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Carregando...
                </>
            ) : (
                children
            )}
        </button>
    );
}
