import Typography from './Typography';

export default function CycleLoading() {
    return (
        <div className="flex items-center justify-center min-h-[60vh] p-6">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
                <Typography
                    variant="body"
                    color="muted"
                    className="font-medium"
                >
                    Carregando informações do ciclo...
                </Typography>
            </div>
        </div>
    );
}
