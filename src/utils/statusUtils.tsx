type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

type CycleStatus =
    | 'Finalizado'
    | 'Em andamento'
    | 'Cancelado'
    | string;

export const getStatusVariant = (status: CycleStatus): BadgeVariant => {
    switch (status) {
        case 'Finalizado':
            return 'success';
        case 'Em andamento':
            return 'warning';
        case 'Cancelado':
            return 'error';
        default:
            return 'default';
    }
};
