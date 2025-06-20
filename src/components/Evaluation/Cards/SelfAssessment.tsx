import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ChevronDown, Check } from 'lucide-react';
import StarRating from '../../StarRating';
import TextAreaWithTitle from '../../TextAreaWithTitle';
import RatingDisplay from '../../RatingDisplay';
import { ErrorMessage } from '../../ErrorMessage';

interface SelfAssessmentProps {
    criterionName: string;
    name: string;
    topicNumber?: number;
    isLast?: boolean;
}

const SelfAssessment: React.FC<SelfAssessmentProps> = ({
    criterionName,
    name,
    topicNumber,
    isLast = false,
}) => {
    const { control, watch } = useFormContext();
    const [isMinimized, setIsMinimized] = useState(false);

    const rating = watch(`${name}.rating`);
    const justification = watch(`${name}.justification`);
    const isCompleted = rating && justification?.trim();

    const toggleMinimized = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <div
            className={`bg-white overflow-hidden ${!isLast ? 'border-b-2 border-b-gray-300' : ''}`}
        >
            <div className="p-4 pl-0" onClick={toggleMinimized}>
                <div className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-6 h-6 rounded-full border-1 text-gray-600 flex items-center justify-center ${
                                !isCompleted
                                    ? 'border-gray-600'
                                    : 'bg-check-color border-check-color'
                            }`}
                        >
                            {!isCompleted ? (
                                topicNumber
                            ) : (
                                <Check
                                    fill="none"
                                    stroke="white"
                                    strokeWidth={2}
                                    size={20}
                                />
                            )}
                        </div>
                        <h1 className="text-lg font-semibold text-gray-800">
                            {criterionName}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <RatingDisplay rating={rating} />
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
                                isMinimized ? 'rotate-0' : '-rotate-180'
                            }`}
                        >
                            <ChevronDown size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`transition-all duration-300 ease-in-out origin-top ${
                    isMinimized
                        ? 'max-h-0 opacity-0 scale-y-0'
                        : 'max-h-[500px] opacity-100 scale-y-100'
                }`}
            >
                <div className="p-4 pt-0 pl-0">
                    <Controller
                        name={`${name}.rating`}
                        control={control}
                        render={({ field, fieldState }) => (
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-sm font-medium text-gray-700">
                                        Dê uma avaliação de 1 a 5 com base no
                                        critério
                                    </p>
                                    <ErrorMessage
                                        error={fieldState.error?.message}
                                    />
                                </div>
                                <StarRating
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </div>
                        )}
                    />

                    <Controller
                        name={`${name}.justification`}
                        control={control}
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
    );
};

export default SelfAssessment;
