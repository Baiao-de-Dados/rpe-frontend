import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';

import TrackCard from '../Cards/TrackCard';
import TrackSubmitButton from '../Buttons/TrackSubmitButton';

import SearchBar from '../../common/Searchbar';
import { SectionLoadingSpinner } from '../../common/SectionLoadingSpinner';

import { TrackSectionSchema } from '../../../schemas/trackSectionSchema';
import type { TrackSectionFormType } from '../../../schemas/trackSectionSchema';

import { createTrackDefaultValues, processTracksForAPI } from './utils/trackUtils';

import { useCycle } from '../../../hooks/useCycle';
import { useToast } from '../../../hooks/useToast';
import { usePillarsQuery } from '../../../hooks/usePillarsQuery';
import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';
import { useTracksCriteriaQuery, useSetTracksMutation, useTracksQuery } from '../../../hooks/useTracksCriteriaQuery';

export function TrackSection() {
    const { showToast } = useToast();

    const { currentCycle } = useCycle();
    const isCycleClosed = !currentCycle?.isOpen;

    const [search, setSearch] = useState('');

    const { shouldReduceMotion } = useOptimizedAnimation();

    const { data: pillars, isLoading: pillarsLoading, error: pillarsError } = usePillarsQuery();
    const { data: tracks, isLoading: tracksLoading, error: tracksLoadingError } = useTracksQuery();
    const { data: tracksCriteria, isLoading: tracksCriteriaLoading, error: tracksError } = useTracksCriteriaQuery();
    const setTracksMutation = useSetTracksMutation({
        onSuccess: () => {
            showToast('Trilhas salvas com sucesso!', 'success', {
                title: 'Sucesso',
                duration: 4000,
            });
        },
        onError: error => {
            showToast('Erro ao salvar trilhas.', 'error', {
                title: 'Erro',
                duration: 5000,
            });
            console.log(error);
        },
    });

    const tracksErrorToastShown = useRef(false);
    const pillarsErrorToastShown = useRef(false);
    const tracksLoadingErrorToastShown = useRef(false);

    useEffect(() => {
        if (pillarsError && !pillarsErrorToastShown.current) {
            showToast('Erro ao carregar pilares. Tente novamente mais tarde.', 'error', {
                title: 'Erro de carregamento',
                duration: 0,
            });
            pillarsErrorToastShown.current = true;
        }
        if (!pillarsError) {
            pillarsErrorToastShown.current = false;
        }
    }, [pillarsError, showToast]);

    useEffect(() => {
        if (tracksError && !tracksErrorToastShown.current) {
            showToast('Erro ao carregar configuração de trilhas. Tente novamente mais tarde.', 'error', {
                title: 'Erro de carregamento',
                duration: 0,
            });
            tracksErrorToastShown.current = true;
        }
        if (!tracksError) {
            tracksErrorToastShown.current = false;
        }
    }, [tracksError, showToast]);

    useEffect(() => {
        if (tracksLoadingError && !tracksLoadingErrorToastShown.current) {
            showToast('Erro ao carregar trilhas. Tente novamente mais tarde.', 'error', {
                title: 'Erro de carregamento',
                duration: 0,
            });
            tracksLoadingErrorToastShown.current = true;
        }
        if (!tracksLoadingError) {
            tracksLoadingErrorToastShown.current = false;
        }
    }, [tracksLoadingError, showToast]);

    const defaultValues: TrackSectionFormType = useMemo(() => createTrackDefaultValues(tracks || [], pillars || [], tracksCriteria), [pillars, tracksCriteria, tracks]);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<TrackSectionFormType>({
        resolver: zodResolver(TrackSectionSchema),
        defaultValues,
        mode: 'onSubmit',
        values: defaultValues,
    });

    const watchedTracks = useWatch({ control, name: 'tracks' });

    const filteredTrackIndexes = useMemo(() => {
        if (!tracks || !search) return tracks?.map((_, idx) => idx) || [];
        return tracks
            .map((track, idx) => ({ track, idx }))
            .filter(({ track }) => track.name.toLowerCase().includes(search.toLowerCase()))
            .map(({ idx }) => idx);
    }, [search, tracks]);

    const memoizedExcludeItems = useMemo(() => [], []);

    if (pillarsLoading || tracksCriteriaLoading || tracksLoading) {
        return <SectionLoadingSpinner />;
    }

    const processTracks = async (data: TrackSectionFormType) => {
        if (!isCycleClosed) {
            showToast('Não é possível editar pois o ciclo está aberto.', 'error', {
                title: 'Edição não permitida',
                duration: 5000,
            });
            return;
        }
        const payload = processTracksForAPI(data);
        await setTracksMutation.mutateAsync(payload);
    };

    return (
        <form onSubmit={handleSubmit(processTracks)} className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <SearchBar value={search} onChange={setSearch} placeholder="Buscar trilha..." showResults={false} className="w-full" excludeItems={memoizedExcludeItems} />
                </div>

                <TrackSubmitButton isCycleClosed={isCycleClosed} isSubmitting={isSubmitting || setTracksMutation.isPending} isValid={isValid && !!tracks && tracks.length > 0 && !tracksLoadingError} />
            </div>

            {filteredTrackIndexes.map((trackIdx: number) => (
                <Controller
                    key={tracks?.[trackIdx]?.id || `track-${trackIdx}`}
                    control={control}
                    name={`tracks.${trackIdx}` as const}
                    render={({ field }) => (
                        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.3, ease: [0.4, 0, 0.2, 1], delay: shouldReduceMotion ? 0 : trackIdx * 0.13 }}>
                            <TrackCard track={watchedTracks?.[trackIdx] || field.value} trackIdx={trackIdx} control={control} isCycleClosed={isCycleClosed} errors={errors?.tracks?.[trackIdx]} />
                        </motion.div>
                    )}
                />
            ))}
        </form>
    );
}
