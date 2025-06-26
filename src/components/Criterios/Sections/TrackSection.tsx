import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockTracks } from '../../../data/mockTracks';
import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';
import { useCycle } from '../../../hooks/useCycle';
import TrackSubmitButton from '../Buttons/TrackSubmitButton';
import SearchBar from '../../common/Searchbar';
import TrackCard from '../Cards/TrackCard';

export function TrackSection() {
    const { shouldReduceMotion } = useOptimizedAnimation();
    const { currentCycle } = useCycle();
    const isCycleClosed = !currentCycle?.isOpen;

    const [search, setSearch] = useState('');

    const searchFunction = useCallback((query: string) => {
        return mockTracks.filter(track =>
            track.title.toLowerCase().includes(query.toLowerCase()),
        );
    }, []);

    const filteredTracks = search ? searchFunction(search) : mockTracks;

    const memoizedExcludeItems = useMemo(() => [], []);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Buscar trilha..."
                        searchFunction={searchFunction}
                        showResults={false}
                        className="w-full"
                        excludeItems={memoizedExcludeItems}
                    />
                </div>
                <TrackSubmitButton isCycleClosed={isCycleClosed} />
            </div>
            {filteredTracks.map((track, idx) => (
                <motion.div
                    key={track.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: shouldReduceMotion ? 0.01 : 0.3,
                        ease: [0.4, 0, 0.2, 1],
                        delay: shouldReduceMotion ? 0 : idx * 0.13,
                    }}
                >
                    <TrackCard
                        trackTitle={track.title}
                        sections={track.sections}
                        isCycleClosed={isCycleClosed}
                    />
                </motion.div>
            ))}
        </div>
    );
}
