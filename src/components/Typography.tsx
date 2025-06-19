interface TypographyProps {
    variant: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
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
        | 'link';
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
        variant === 'body' ? 'p' : variant === 'caption' ? 'span' : variant;

    return (
        <Tag
            className={`${variants[variant]} ${colors[color]} ${className} ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            {children}
        </Tag>
    );
}
