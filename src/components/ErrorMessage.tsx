import Typography from './Typography';

interface ErrorMessageProps {
    error?: string;
    show?: boolean;
}

export function ErrorMessage({ error, show = true }: ErrorMessageProps) {
    if (!error || !show) {
        return null;
    }

    return (
        <Typography variant="body" className="text-red-500 text-sm">
            {error}
        </Typography>
    );
}
