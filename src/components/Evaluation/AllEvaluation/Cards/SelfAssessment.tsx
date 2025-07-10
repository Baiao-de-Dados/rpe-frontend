import { useState, memo } from 'react';
import { ChevronDown } from 'lucide-react';

import Typography from '../../../common/Typography';
import StarRating from '../../../common/StarRating';
import RatingDisplay from '../../../common/RatingDisplay';
import TextAreaWithTitle from '../../../common/TextAreaWithTitle';

interface SelfAssessmentProps {
    criterionName: string;
    rating: number;
    mentorRating: number;
    justification: string;
    isLast?: boolean;
}

const SelfAssessment = memo(({ criterionName, rating, mentorRating, justification, isLast = false }: SelfAssessmentProps) => {

    const [isMinimized, setIsMinimized] = useState(false);

    const toggleMinimized = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <div className={`bg-white overflow-hidden ${!isLast ? 'border-b-2 border-b-gray-300' : ''}`}>
            <div className="p-4 pl-0" onClick={toggleMinimized}>
                <div className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-semibold text-gray-800">
                            {criterionName}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <RatingDisplay rating={rating} />
                        <RatingDisplay rating={mentorRating} />
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${isMinimized ? 'rotate-0' : '-rotate-180'}`}> 
                            <ChevronDown size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`transition-all duration-300 ease-in-out origin-top ${isMinimized ? 'max-h-0 opacity-0 scale-y-0' : 'max-h-[500px] opacity-100 scale-y-100'}`}>
                <div className="p-4 pt-0 pl-0">
                    <div className="flex gap-0 mb-6 items-end justify-start">
                        <div className="flex flex-row items-end">
                            <div className="flex flex-col border-r border-gray-300 pr-10 mr-4">
                                <Typography variant="body" className="text-sm text-gray-600 mb-2">
                                    Sua avaliação de 1 à 5
                                </Typography>
                                <div className="flex items-center">
                                    <StarRating value={rating ?? null} readOnly />
                                </div>
                            </div>
                            <div className="flex flex-col pl-10 ">
                                <Typography variant="body" className="text-sm text-gray-600 mb-2">
                                    Avaliação final
                                </Typography>
                                <div className="flex items-center">
                                    <StarRating value={typeof mentorRating === 'number' ? mentorRating : null} readOnly final />
                                </div>
                            </div>
                        </div>
                    </div>
                    <TextAreaWithTitle
                        title="Justifique sua nota"
                        placeholder="Justifique sua nota"
                        value={justification || ''}
                        readOnly
                        maxLength={1000}
                    />
                </div>
            </div>
        </div>
    );
});

export default SelfAssessment;
