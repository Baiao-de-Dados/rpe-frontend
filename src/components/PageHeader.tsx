import Typography from './Typography';
import type { ReactNode } from 'react';

type PageHeaderProps = {
    title: string;
    button?: ReactNode;
    children?: ReactNode;
};

export default function PageHeader({
    title,
    button,
    children,
}: PageHeaderProps) {
    return (
        <header className="sticky top-0 z-50 pt-12 pb-0 bg-white flex flex-col justify-between shadow-sm">
            <div className="p-8 flex items-center justify-between">
                <Typography
                    variant="h1"
                    color="primary500"
                    className="text-4xl font-bold"
                >
                    {title}
                </Typography>
                <div className="flex gap-4 items-center">{button}</div>
            </div>
            {children}
        </header>
    );
}
