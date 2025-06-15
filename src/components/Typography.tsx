import React from 'react';
import type { JSX } from 'react';

interface TypographyProps {
    variant: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
    children: React.ReactNode;
    className?: string;
    color?: 'primary' | 'secondary' | 'error';
}

export default function Typography({
    variant,
    children,
    className = '',
    color = 'primary',
}: TypographyProps) {
    const variants = {
        h1: 'text-3xl font-bold',
        h2: 'text-2xl font-semibold',
        h3: 'text-xl font-medium',
        body: 'text-base',
        caption: 'text-sm',
    };

    const colors = {
        primary: 'text-gray-900',
        secondary: 'text-gray-600',
        error: 'text-red-600',
    };

    const tag = {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        body: 'p',
        caption: 'span',
    }[variant] as keyof JSX.IntrinsicElements;

    return React.createElement(
        tag,
        {
            className: `${variants[variant]} ${colors[color]} ${className}`,
        },
        children,
    );
}
