import Toast from './common/Toast';

import { useToast } from '../hooks/useToast';

const GlobalToast = () => {

    const { toasts, hideToast } = useToast();

    if (!toasts.length) return null;

    return (
        <>
            <div className="hidden sm:fixed sm:bottom-4 sm:right-4 sm:z-[9999] sm:flex sm:flex-col-reverse sm:space-y-reverse sm:space-y-2 sm:max-w-sm sm:w-full">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        show={toast.show}
                        title={toast.title}
                        onClose={() => hideToast(toast.id)}
                    />
                ))}
            </div>

            <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[9999] px-4 pb-6 space-y-2">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        show={toast.show}
                        title={toast.title}
                        onClose={() => hideToast(toast.id)}
                        isMobile={true}
                    />
                ))}
            </div>
        </>
    );

};

export default GlobalToast;
