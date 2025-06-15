import React, { useState } from 'react';

interface AvatarProps {
    name: string;
    image?: string;
}

const Avatar: React.FC<AvatarProps> = props => {
    const [imageError, setImageError] = useState(false);

    const getFirstAndLastInitials = (name: string) => {
        const parts = name.trim().split(' ').filter(Boolean);

        if (parts.length === 0) return '';

        const first = parts[0][0];
        const last = parts[parts.length - 1][0];

        return (first + last).toUpperCase();
    };

    return (
        <div>
            <div className="w-[7vw] h-[7vw] max-w-[50px] max-h-[50px] bg-gray-300 rounded-full flex flex-row justify-center items-center text-lg sm:text-xl md:text-xl lg:text-xl font-bold overflow-hidden">
                {props.image && !imageError ? (
                    <img
                        src={props.image}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    getFirstAndLastInitials(props.name)
                )}
            </div>
        </div>
    );
};

export default Avatar;
