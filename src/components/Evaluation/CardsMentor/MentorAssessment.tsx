import { useState, memo } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import StarRating from '../../common/StarRating';
import RatingDisplay from '../../common/RatingDisplay';
import { ErrorMessage } from '../../common/ErrorMessage';
import Typography from '../../common/Typography';

interface MentorAssessmentProps {
    criterionName: string;
    name: string;
    topicNumber?: number;
    isLast?: boolean;
    // Dados do colaborador (read-only)
    collaboratorRating?: number | null;
    collaboratorJustification?: string;
}

const MentorAssessment = memo(({ 
    criterionName, 
    name, 
    topicNumber, 
    isLast = false,
    collaboratorRating,
    collaboratorJustification
}: MentorAssessmentProps) => {

    const { control } = useFormContext();
    const [isMinimized, setIsMinimized] = useState(false);

    const toggleMinimized = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <div className={`bg-white overflow-hidden ${!isLast ? 'border-b-2 border-b-gray-300' : ''}`}>
            <div className="p-4 pl-0" onClick={toggleMinimized}>
                {/* Layout responsivo: vertical no mobile, horizontal no desktop */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between cursor-pointer gap-3 sm:gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <Controller name={`${name}.rating`} control={control}
                            render={({ field: ratingField }) => (
                                <Controller name={`${name}.justification`} control={control}
                                    render={({ field: justificationField }) => {
                                        const isCompleted = ratingField.value && justificationField.value?.trim();
                                        return (
                                            <div className={`w-6 h-6 min-w-[24px] min-h-[24px] rounded-full border-1 text-gray-600 flex items-center justify-center text-sm font-medium ${ 
                                                !isCompleted ? 'border-gray-600' : 'bg-check-color border-check-color' 
                                            }`}>
                                                {!isCompleted ? (
                                                    topicNumber
                                                ) : (
                                                    <Check fill="none" stroke="white" strokeWidth={2} size={16} />
                                                )}
                                            </div>
                                        );
                                    }}
                                />
                            )}
                        />
                        <Typography variant="h3" className="text-gray-800 text-base sm:text-lg sm:truncate">
                            {criterionName}
                        </Typography>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-2 flex-shrink-0">
                        {/* Exibir notas lado a lado */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="flex flex-col items-center group relative">
                                <RatingDisplay 
                                    rating={collaboratorRating ?? null} 
                                    className="!text-black font-bold"
                                />
                            </div>
                            <div className="flex flex-col items-center group relative">
                                <Controller name={`${name}.rating`} control={control}
                                    render={({ field }) => (
                                        <RatingDisplay 
                                            rating={field.value} 
                                            className="font-bold"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${ 
                            isMinimized ? 'rotate-0' : '-rotate-180' 
                        }`}>
                            <ChevronDown size={18} className="sm:hidden" />
                            <ChevronDown size={24} className="hidden sm:block" />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`transition-all duration-300 ease-in-out origin-top ${ 
                isMinimized ? 'max-h-0 opacity-0 scale-y-0' : 'max-h-[500px] opacity-100 scale-y-100' 
            }`}>
                <div className="p-4 pt-0 pl-0 sm:p-4">
                    {/* Layout em duas colunas lado a lado */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                        {/* Coluna do Colaborador (Read-only) */}
                        <div>
                            <div className="mb-4 sm:mb-6">
                                <div className="flex items-center justify-between mb-2 sm:mb-3">
                                    <Typography variant="body" color="primary" className="font-medium text-sm sm:text-base">
                                        Avaliação do colaborador
                                    </Typography>
                                </div>
                                <div className="pointer-events-none opacity-70">
                                    <StarRating 
                                        value={collaboratorRating ?? null} 
                                        onChange={() => {}} 
                                    />
                                </div>
                            </div>

                            <div className="mb-3 sm:mb-4">
                                <Typography variant="body" color="primary" className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                                    Justificativa do colaborador
                                </Typography>
                                <div className="bg-gray-100 rounded-lg p-2 sm:p-3 border border-gray-200 h-24 sm:h-32 overflow-y-auto">
                                    <Typography variant="body" color="muted" className="text-xs sm:text-sm">
                                        {collaboratorJustification || 'Nenhuma justificativa fornecida'}
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        {/* Coluna do Mentor (Editável) */}
                        <div>
                            <Controller name={`${name}.rating`} control={control}
                                render={({ field, fieldState }) => (
                                    <div className="mb-4 sm:mb-6">
                                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                                            <Typography variant="body" color="primary" className="font-medium text-sm sm:text-base">
                                                Dê uma avaliação de 1 a 5 com base no critério
                                            </Typography>
                                            <ErrorMessage error={fieldState.error?.message} />
                                        </div>
                                        <StarRating value={field.value} onChange={field.onChange} />
                                    </div>
                                )}
                            />

                            <Controller name={`${name}.justification`} control={control}
                                render={({ field, fieldState }) => (
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <Typography variant="body" color="primary" className="font-medium text-sm sm:text-base">
                                                Justifique sua nota
                                            </Typography>
                                            <ErrorMessage error={fieldState.error?.message} />
                                        </div>
                                        <textarea
                                            className="w-full h-24 sm:h-32 p-2 sm:p-3 border-2 border-gray-300 rounded-lg text-xs sm:text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:border-primary-500 resize-none"
                                            placeholder="Justifique sua nota"
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            maxLength={1000}
                                        />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default MentorAssessment;
