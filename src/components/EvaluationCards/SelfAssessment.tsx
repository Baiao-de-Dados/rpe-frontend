import React, { useState, memo } from 'react';
import StarRating from '../StarRating';
import { ChevronDown, Check } from 'lucide-react';
import TextAreaWithTitle from '../TextAreaWithTitle';
import RatingDisplay from '../RatingDisplay';

interface TopicProps {
    topicName: string;
    topicNumber?: number;
    isLast?: boolean;
    rating?: number;
    justification?: string;
    onEvaluationChange?: (rating: number | null, justification: string) => void;
}

const SelfAssessment: React.FC<TopicProps> = ({
    topicName,
    topicNumber,
    isLast = false,
    rating: initialRating,
    justification: initialJustification = '',
    onEvaluationChange,
}) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [rating, setRating] = useState<number | null>(initialRating || null);
    const [isJustified, setIsJustified] = useState(
        initialJustification.trim() !== '',
    );
    const [justification, setJustification] = useState(initialJustification);

    const toggleMinimized = () => {
        setIsMinimized(!isMinimized);
    };

    const handleJustificationChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const text = e.target.value;
        setJustification(text);
        const justified = text.trim() !== '';
        setIsJustified(justified);
        onEvaluationChange?.(rating, text);
    };

    const handleRatingChange = (newRating: number | null) => {
        setRating(newRating);
        onEvaluationChange?.(newRating, justification);
    };

    return (
        <div
            className={`bg-white overflow-hidden ${!isLast ? 'border-b-2 border-b-gray-300' : ''}`}
        >
            <div className="p-4 pl-0" onClick={toggleMinimized}>
                <div className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-6 h-6 rounded-full border-1 text-gray-600 flex items-center justify-center ${!rating || !isJustified ? 'border-gray-600' : 'bg-check-color border-check-color'}`}
                        >
                            {!rating || !isJustified ? (
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
                            {topicName}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <RatingDisplay rating={rating} />
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${isMinimized ? 'rotate-0' : '-rotate-180'}`}
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
                    <p className="text-sm text-gray-600 mb-2">
                        Dê uma avaliação de 1 à 5 com base no critério
                    </p>
                    <div className="mb-2">
                        <StarRating
                            value={rating}
                            onChange={handleRatingChange}
                        />
                    </div>
                    <TextAreaWithTitle
                        title="Justifique sua nota"
                        placeholder="Justifique sua nota"
                        value={justification}
                        onChange={handleJustificationChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default memo(SelfAssessment);
