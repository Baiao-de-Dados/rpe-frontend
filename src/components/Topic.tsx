import React, { useState } from 'react';
import StarRating from './StarRating';
import { ChevronDown, Check } from 'lucide-react';
import TextAreaWithTitle from './TextAreaWithTitle';

interface TopicProps {
    topicName: string;
    topicNumber?: number;
    isLast: boolean;
}

const Topic: React.FC<TopicProps> = ({ topicName, topicNumber, isLast }) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [rating, setRating] = useState<number | null>(null);
    const [isJustified, setIsJustified] = useState(false);
    const [justification, setJustification] = useState('');

    const toggleMinimized = () => {
        setIsMinimized(!isMinimized);
    };

    const handleJustificationChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const text = e.target.value;
        setJustification(text);
        setIsJustified(text.trim() !== '');
    };

    return (
        <div
            className={`bg-white overflow-hidden ${isLast ? 'border-b-0' : 'border-b-2 border-b-gray-300'}`}
        >
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-6 h-6 rounded-full border-2 text-gray-600 flex items-center justify-center font-semibold ${!rating || !isJustified ? 'border-gray-600' : 'bg-check-color border-check-color'}`}
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
                        <span className="w-8 text-sm font-medium text-primary-500 bg-gray-200 flex justify-center rounded-sm">
                            {rating ?? '-'}
                        </span>
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 ${isMinimized ? 'rotate-0' : '-rotate-180'}`}
                            onClick={toggleMinimized}
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
                <div className="p-4 pt-0">
                    <p className="text-sm text-gray-600 mb-2">
                        Dê uma avaliação de 1 à 5 com base no critério
                    </p>
                    <div className="mb-2">
                        <StarRating
                            value={rating}
                            onChange={newValue => setRating(newValue)}
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

export default Topic;
