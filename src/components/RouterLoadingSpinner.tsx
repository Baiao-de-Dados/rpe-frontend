const LoadingSpinner = () => (
    <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
        <span className="sr-only">Carregando...</span>
    </div>
);

export default LoadingSpinner;
