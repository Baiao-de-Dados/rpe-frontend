interface TypographyProps {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
    children: React.ReactNode;
    className?: string;
    color?:
        | 'primary'
        | 'primary500'
        | 'secondary'
        | 'muted'
        | 'error'
        | 'success'
        | 'warning'
        | 'gradient'
        | 'white'
        | 'link'
        | 'inherit';
    onClick?: () => void;
}

export default function Typography({
    variant,
    children,
    className = '',
    color = 'primary',
    onClick,
}: TypographyProps) {
    const variants = {
        h1: 'text-3xl font-bold',
        h2: 'text-2xl font-semibold',
        h3: 'text-xl',
        h4: 'text-base',
        body: 'text-base',
        caption: 'text-sm',
    };

    const colors = {
        primary: 'text-primary-700',
        primary500: 'text-primary-500',
        secondary: 'text-primary-600',
        muted: 'text-neutral-500',
        error: 'text-error-500',
        success: 'text-check-color',
        warning: 'text-yellow-500',
        gradient: 'text-gradient-primary',
        white: 'text-white',
        link: 'text-primary-600 hover:text-primary-700',
    };

    const Tag =
        variant === 'body'
            ? 'p'
            : variant === 'caption'
              ? 'span'
              : variant === 'h4'
                ? 'h4'
                : variant;

    return (
        <Tag
            className={`${variants[variant]}${onClick ? ' cursor-pointer' : ''} ${color !== 'inherit' ? colors[color] : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </Tag>
    );
}
