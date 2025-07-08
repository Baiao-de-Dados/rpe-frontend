import { useState, memo } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { motion } from 'framer-motion';

import StarRating from '../../common/StarRating';
import RatingDisplay from '../../common/RatingDisplay';
import { ErrorMessage } from '../../common/ErrorMessage';
import TextAreaWithTitle from '../../common/TextAreaWithTitle';
import IAValidateActions from '../../common/IAValidateActions';
import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

interface SelfAssessmentProps {
    criterionName: string;
    name: string;
    topicNumber?: number;
    isLast?: boolean;
}

const SelfAssessment = memo(({ criterionName, name, topicNumber, isLast = false }: SelfAssessmentProps) => {

        const { control, setValue } = useFormContext();

        const [isMinimized, setIsMinimized] = useState(false);

        const { optimizedTransition } = useOptimizedAnimation();

        const watchedSelfAssessmentIAValid = useWatch({
            control,
            name: `${name}.selfAssessmentIAValid`
        });

        const handleCheck = () => {
            setValue(`${name}.selfAssessmentIAValid`, true, { shouldValidate: true });
        };

        const handleCancel = () => {
            setValue(`${name}.selfAssessmentIAValid`, true, { shouldValidate: true });
            setValue(`${name}.rating`, null);
            setValue(`${name}.justification`, '');
        };

        const toggleMinimized = () => {

            if (!(watchedSelfAssessmentIAValid ?? true) && !isMinimized) {
                return;
            }
            setIsMinimized(!isMinimized);
        };
        return (
            <motion.div layout transition={optimizedTransition}>
                <div className={`bg-white overflow-hidden ${!isLast ? 'border-b-2 border-b-gray-300' : ''}`}>

                    <Controller name={`${name}.selfAssessmentIAValid`} control={control}
                        render={({ field }) => (
                            <input type="hidden" {...field} value={(watchedSelfAssessmentIAValid ?? true) ? 'true' : 'false'} />
                        )}
                    />

                    {!(watchedSelfAssessmentIAValid ?? true) && (
                        <IAValidateActions onCheck={handleCheck} onCancel={handleCancel} />
                    )}

                    <div className={`p-4 pl-0 ${!(watchedSelfAssessmentIAValid ?? true) ? 'pt-0' : ''}`}>
                        <div className="mb-4 flex items-center justify-between cursor-pointer" onClick={toggleMinimized}>
                            <div className="flex items-center gap-2">
                                <Controller name={`${name}.rating`} control={control}
                                    render={({ field: ratingField }) => (
                                        <Controller name={`${name}.justification`} control={control}
                                            render={({ field: justificationField,}) => {
                                                const isCompleted = ratingField.value && justificationField.value?.trim();
                                                return (
                                                    <div className={`w-6 h-6 min-w-[24px] min-h-[24px] rounded-full border-1 text-gray-600 flex items-center justify-center text-sm font-medium ${ !isCompleted ? 'border-gray-600' : 'bg-check-color border-check-color' }`}>
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
                                <h1 className="text-lg font-semibold text-gray-800">
                                    {criterionName}
                                </h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <Controller name={`${name}.rating`} control={control}
                                    render={({ field }) => (
                                        <RatingDisplay rating={field.value} />
                                    )}
                                />
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${ isMinimized ? 'rotate-0' : '-rotate-180' }`}>
                                    <ChevronDown size={24} />
                                </div>
                            </div>
                        </div>

                        <div className={`transition-all duration-300 ease-in-out origin-top ${ isMinimized ? 'max-h-0 opacity-0 scale-y-0' : 'max-h-[500px] opacity-100 scale-y-100' }`}>
                            <div className="p-4 pt-0 pl-0">
                                <Controller name={`${name}.rating`} control={control}
                                    render={({ field, fieldState }) => (
                                        <div className="mb-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="text-sm font-medium text-gray-700">
                                                    Dê uma avaliação de 1 a 5 com base
                                                    no critério
                                                </p>
                                                <ErrorMessage error={fieldState.error?.message} />
                                            </div>
                                            <StarRating value={field.value} onChange={field.onChange} />
                                        </div>
                                    )}
                                />

                                <Controller name={`${name}.justification`} control={control}
                                    render={({ field, fieldState }) => (
                                        <TextAreaWithTitle
                                            title="Justifique sua nota"
                                            placeholder="Justifique sua nota"
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            maxLength={1000}
                                            error={fieldState.error?.message}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    },
);

export default SelfAssessment;
