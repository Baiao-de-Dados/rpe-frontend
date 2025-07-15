import { useQueryState } from 'nuqs';
import { AnimatePresence, motion } from 'framer-motion';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useEffect, useState, useCallback, useMemo, memo } from 'react';

import Evaluation360 from '../Cards/Evaluation360';

import SearchBar from '../../common/Searchbar';
import Typography from '../../common/Typography';
import AnimatedCard from '../../common/AnimatedCard';
import CollaboratorCard from '../../common/CollaboratorCard';

import { useCycleNetworkQuery } from '../../../hooks/api/useCollaboratorQuery';
import { Loader2 } from 'lucide-react';

import type { EvaluationFormData } from '../../../schemas/evaluation';

import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

export const Evaluation360Section = memo(() => {

    const { variants } = useOptimizedAnimation();
    const { control, setValue, getValues } = useFormContext<EvaluationFormData>();
    const [searchQuery, setSearchQuery] = useQueryState('eval360_search', {
        defaultValue: '',
        history: 'replace',
    });
    const { fields, append } = useFieldArray({
        control,
        name: 'evaluation360',
    });
    const validFields = useMemo(() => 
        fields.filter(field => field.collaboratorId),
        [fields],
    );
    const selectedCollaboratorIds = useMemo(() => 
        validFields.map(f => f.collaboratorId),
        [validFields],
    );
    const [showCards, setShowCards] = useState(validFields.length > 0);
    const [showEmptyMessage, setShowEmptyMessage] = useState(validFields.length === 0);
    useEffect(() => {
        if (validFields.length > 0) {
            setShowCards(true);
            setShowEmptyMessage(false);
        } else {
            const timeout = setTimeout(() => {
                setShowCards(false);
                setShowEmptyMessage(true);
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [validFields.length]);

    const { data: networkData, isLoading: isNetworkLoading } = useCycleNetworkQuery();
    const collaborators = useMemo(() => networkData?.sameProjectUsers ?? [], [networkData]);

    const searchFunction = useCallback((query: string) => {
        if (!query.trim()) return collaborators;
        const lowerQuery = query.toLowerCase();
        return collaborators.filter(
            collaborator =>
                collaborator.name.toLowerCase().includes(lowerQuery) ||
                collaborator.position.toLowerCase().includes(lowerQuery)
        );
    }, [collaborators]);

    const selectedCollaborators = useCallback(
        (searchCollaboratorIds: number[]) =>
            collaborators.filter(c => searchCollaboratorIds.includes(c.id)),
        [collaborators]
    );

    const addCollaborator = useCallback((collaborator: typeof collaborators[0]) => {
        append({
            collaboratorId: collaborator.id,
            rating: null, 
            strengths: '', 
            improvements: '',
            evaluation360IAValid: true
        });
        setSearchQuery('');
    }, [append, setSearchQuery]);

    const removeCollaborator = useCallback(async (collaboratorId: number) => {
        const currentEvaluations = getValues('evaluation360') || [];
        const newEvaluations = currentEvaluations.filter(
            evaluation => evaluation.collaboratorId !== collaboratorId,
        );
        setValue('evaluation360', newEvaluations);
    }, [getValues, setValue]);

    const renderItem = useCallback((collaborator: typeof collaborators[0]) => (
        <CollaboratorCard collaborator={collaborator} variant="compact" />
    ), []);

    const excludeItems = useMemo(() => 
        selectedCollaborators(selectedCollaboratorIds),
        [selectedCollaborators, selectedCollaboratorIds],
    );

    if (isNetworkLoading) {
        return (
            <div className="flex justify-center items-center py-8">
                <Loader2 className="animate-spin h-8 w-8 text-primary-500" />
            </div>
        );
    }

    return (
        <section>
            <div className="mb-8">
                <SearchBar 
                    value={searchQuery} 
                    onChange={setSearchQuery} 
                    placeholder="Buscar colaboradores" 
                    className="w-full" 
                    searchFunction={searchFunction} 
                    onItemSelect={addCollaborator}
                    renderItem={renderItem} 
                    excludeItems={excludeItems} 
                    getItemKey={collaborator => String(collaborator.id)} 
                    noResultsMessage={isNetworkLoading ? 'Carregando colaboradores...' : 'Nenhum colaborador encontrado'}
                />
            </div>

            {showCards && (
                <div className="space-y-6 relative -z-1">
                    <AnimatePresence>
                        {validFields.map((field, validIndex) => {
                            const collaborator = collaborators.find(c => c.id === field.collaboratorId);
                            if (!collaborator) return null;

                            const originalIndex = fields.findIndex(f => f.id === field.id);
                            const fieldName = `evaluation360.${originalIndex}`;

                            return (
                                <AnimatedCard key={`eval360-${field.collaboratorId}`} index={validIndex}>
                                    <Evaluation360 
                                        collaborator={collaborator} 
                                        name={fieldName}
                                        index={originalIndex}
                                        onRemove={() =>
                                            removeCollaborator(
                                                field.collaboratorId,
                                            )
                                        }/>
                                </AnimatedCard>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}

            <AnimatePresence>
                {showEmptyMessage && !searchQuery && (
                    <motion.div 
                        key="empty-message" 
                        variants={variants.emptyMessage} 
                        initial="initial" 
                        animate="animate" 
                        exit="exit" 
                        className="text-center py-12"
                    >
                        <Typography variant="body" className="text-gray-500">
                            Nenhuma avaliação adicionada
                        </Typography>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
});