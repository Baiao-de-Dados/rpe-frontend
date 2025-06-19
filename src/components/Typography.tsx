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
        | 'gradient'
        | 'white';
    onClick?: () => void; // Add onClick prop
}

export default function Typography({
    variant,
    children,
    className = '',
    color = 'primary',
    onClick, // Include onClick in props
}: TypographyProps) {
    const variants = {
        h1: 'text-3xl font-bold',
        h2: 'text-2xl font-semibold',
        h3: 'text-xl', // Remove font-medium para permitir customização
        body: 'text-base',
        caption: 'text-sm',
    };

    const colors = {
        primary: 'text-primary-700', // Texto principal
        primary500: 'text-primary-500', // Texto primary 500
        secondary: 'text-primary-600', // Texto secundário
        muted: 'text-primary-400', // Texto suave/disabled
        error: 'text-red-600', // Erros
        gradient: 'text-gradient-primary', // Gradiente customizado
        white: 'text-white', // Texto branco
    };

    const Tag =
        variant === 'body' ? 'p' : variant === 'caption' ? 'span' : variant;

    return (
        <Tag
            className={`${variants[variant]} ${colors[color]} ${className}`}
            onClick={onClick} // Pass onClick to the rendered tag
        >
            {children}
        </Tag>
    );
}
