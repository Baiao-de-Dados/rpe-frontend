import type { BadgeVariant } from '../components/Badge';

type CycleStatus =
    | 'Finalizado'
    | 'Em andamento'
    | 'Pendente'
    | 'Cancelado'
    | string;

export const getStatusVariant = (status: CycleStatus): BadgeVariant => {
    switch (status) {
        case 'Finalizado':
            return 'success';
        case 'Em andamento':
            return 'warning';
        case 'Pendente':
            return 'default';
        case 'Cancelado':
            return 'error';
        default:
            return 'default';
    }
};
