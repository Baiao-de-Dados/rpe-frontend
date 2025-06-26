import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mockTracks } from '../../../data/mockTracks';
import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';
import { useCycle } from '../../../hooks/useCycle';
import SearchBar from '../../common/Searchbar';
import TrackCard from '../Cards/TrackCard';
import TrackSubmitButton from '../Buttons/TrackSubmitButton';
import type { TrackSectionFormType } from '../../../schemas/trackSectionSchema';
import { TrackSectionSchema } from '../../../schemas/trackSectionSchema';
import { useToast } from '../../../hooks/useToast';

export function TrackSection() {
    const { shouldReduceMotion } = useOptimizedAnimation();
    const { currentCycle } = useCycle();
    const isCycleClosed = !currentCycle?.isOpen;
    const { showToast } = useToast();

    const [search, setSearch] = useState('');

    const defaultValues: TrackSectionFormType = {
        tracks: mockTracks.map(track => ({
            ...track,
            pillars: track.pillars.map(pillar => ({
                ...pillar,
                criteria: pillar.criteria.map(criterion => ({
                    ...criterion,
                    isActive: false,
                    weight: '',
                })),
            })),
        })),
    };

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<TrackSectionFormType>({
        resolver: zodResolver(TrackSectionSchema),
        defaultValues,
        mode: 'onSubmit',
    });

    const watchedTracks = useWatch({ control, name: 'tracks' });

    const filteredTrackIndexes = useMemo(() => {
        if (!search) return mockTracks.map((_, idx) => idx);
        return mockTracks
            .map((track, idx) => ({ track, idx }))
            .filter(({ track }) =>
                track.title.toLowerCase().includes(search.toLowerCase()),
            )
            .map(({ idx }) => idx);
    }, [search]);
    const memoizedExcludeItems = useMemo(() => [], []);

    const processTracks = async (data: TrackSectionFormType) => {
        if (!isCycleClosed) {
            showToast(
                'Não é possível editar pois o ciclo está aberto.',
                'error',
                { title: 'Edição não permitida', duration: 5000 },
            );
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 2000));

        const result = data.tracks.map(track => ({
            id: track.id,
            pillars: track.pillars
                .map(pillar => {
                    const activeCriteria = pillar.criteria.filter(
                        c => c.isActive,
                    );
                    if (activeCriteria.length === 0) return null;
                    return {
                        id: pillar.id,
                        criteria: activeCriteria.map(c => ({
                            id: c.id,
                            weight: c.weight ? Number(c.weight) : undefined,
                        })),
                    };
                })
                .filter(Boolean),
        }));
        console.log(JSON.stringify(result, null, 2));
        showToast('Trilhas salvas com sucesso!', 'success', {
            title: 'Sucesso',
            duration: 4000,
        });
    };

    return (
        <form onSubmit={handleSubmit(processTracks)} className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Buscar trilha..."
                        showResults={false}
                        className="w-full"
                        excludeItems={memoizedExcludeItems}
                    />
                </div>
                <TrackSubmitButton
                    isCycleClosed={isCycleClosed}
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                />
            </div>
            {filteredTrackIndexes.map(trackIdx => (
                <Controller
                    key={mockTracks[trackIdx].id}
                    control={control}
                    name={`tracks.${trackIdx}` as const}
                    render={({ field }) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: shouldReduceMotion ? 0.01 : 0.3,
                                ease: [0.4, 0, 0.2, 1],
                                delay: shouldReduceMotion ? 0 : trackIdx * 0.13,
                            }}
                        >
                            <TrackCard
                                track={watchedTracks?.[trackIdx] || field.value}
                                trackIdx={trackIdx}
                                control={control}
                                isCycleClosed={isCycleClosed}
                                errors={errors?.tracks?.[trackIdx]}
                            />
                        </motion.div>
                    )}
                />
            ))}
        </form>
    );
}
