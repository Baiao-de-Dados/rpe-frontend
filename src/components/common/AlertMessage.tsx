import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import Typography from './Typography';

interface AlertMessageProps {
    message: string;
    type?: 'success' | 'error' | 'alert';
    className?: string;
}

const iconMap = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <XCircle className="w-5 h-5 text-red-600" />,
    alert: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
};

const bgMap = {
    success: 'bg-green-100 border-green-500 text-green-800',
    error: 'bg-red-100 border-red-500 text-red-800',
    alert: 'bg-yellow-100 border-yellow-500 text-yellow-800',
};

function AlertMessage({
    message,
    type = 'alert',
    className = '',
}: AlertMessageProps) {
    return (
        <div
            className={`border-l-4 p-3 rounded mb-2 flex items-center gap-2 ${bgMap[type]} ${className}`}
        >
            {iconMap[type]}
            <Typography variant="body">{message}</Typography>
        </div>
    );
}

export default AlertMessage;
