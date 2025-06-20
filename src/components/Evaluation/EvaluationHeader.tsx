import { memo } from 'react';
import Typography from '../Typography';

const sections = ['Autoavaliação', 'Avaliação 360', 'Mentoring', 'Referências'];

function EvaluationHeaderComponent() {
    return (
        <header className="sticky top-0 z-50 pt-12 pb-0 bg-white flex flex-col justify-between shadow-sm">
            <div className="p-8 flex items-center justify-between">
                <Typography variant="h1" className="text-4xl font-bold">
                    Ciclo 2025.1
                </Typography>
                <div className="flex gap-4 items-center"></div>
            </div>
            <nav className="flex space-x-20 mt-2 border-t-3 pt-5 pl-14 bg border-gray-50">
                {sections.map(section => {
                    return (
                        <div
                            key={section}
                            className="relative min-w-38 text-center"
                        >
                            <Typography
                                variant="body"
                                className={`cursor-pointer pb-4 pl-5 pr-5 text-primary-600 font-normal relative`}
                            >
                                <span className="invisible font-semibold absolute inset-0">
                                    {section}
                                </span>
                                {section}
                            </Typography>
                        </div>
                    );
                })}
            </nav>
        </header>
    );
}

export const EvaluationHeader = memo(EvaluationHeaderComponent);
