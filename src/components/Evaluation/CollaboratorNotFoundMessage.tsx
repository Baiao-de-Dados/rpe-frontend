import Typography from '../common/Typography';

export default function CollaboratorNotFoundMessage() {
    return (
        <div className="flex items-center justify-center min-h-[60vh] p-4">
            <div className="text-center">
                <Typography variant="h2" className="mb-4">Colaborador não encontrado</Typography>
                <Typography variant="body" color="muted">
                    Não foi possível encontrar as informações do colaborador.
                </Typography>
            </div>
        </div>
    );
}
