import { cn } from '../../lib/utils';

interface NotificationBadgeProps {
    show: boolean;
    variant?: 'default' | 'small' | 'medium' | 'large';
    position?:
        | 'top-right'
        | 'top-left'
        | 'bottom-right'
        | 'bottom-left'
        | 'center-right';
    className?: string;
    count?: number;
    absolute?: boolean;
}

const variantStyles = {
    default: 'w-3 h-3',
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4',
};

const positionStyles = {
    'top-right': '-top-1 -right-1',
    'top-left': '-top-1 -left-1',
    'bottom-right': '-bottom-1 -right-1',
    'bottom-left': '-bottom-1 -left-1',
    'center-right': 'top-1/2 -translate-y-1/2 -right-4',
};

export default function NotificationBadge({
    show,
    variant = 'default',
    position = 'top-right',
    className,
    count,
    absolute = true,
}: NotificationBadgeProps) {
    if (!show) return null;

    const hasCount = count !== undefined && count > 0;

    return (
        <div
            className={cn(
                absolute && 'absolute',
                'bg-red-500 rounded-full flex items-center justify-center',
                variantStyles[variant],
                absolute && positionStyles[position],
                hasCount && 'min-w-5 h-5 px-1',
                className,
            )}
        >
            {hasCount && (
                <span className="text-white text-xs font-medium leading-none">
                    {count > 99 ? '99+' : count}
                </span>
            )}
        </div>
    );
}
