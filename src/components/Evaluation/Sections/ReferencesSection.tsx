import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import SearchBar from '../../Searchbar';
import CollaboratorCard from '../../CollaboratorCard';
import AnimatedCard from '../../AnimatedCard';
import Typography from '../../Typography';
import Reference from '../Cards/Reference';
import { searchCollaborators } from '../../../data/mockCollaborators';
import type { Collaborator } from '../../../data/mockCollaborators';
import type { EvaluationFormData } from '../../../schemas/evaluation';
import { useQueryState } from 'nuqs';

export const ReferencesSection = memo(() => {
    const { control, setValue, getValues } =
        useFormContext<EvaluationFormData>();

    const [searchQuery, setSearchQuery] = useQueryState('ref_search', {
        defaultValue: '',
        history: 'replace',
    });

    const { fields, append } = useFieldArray({
        control,
        name: 'references',
    });

    const validFields = useMemo(
        () => fields.filter(field => field.collaboratorId),
        [fields],
    );

    const selectedCollaboratorIds = useMemo(
        () => validFields.map(f => f.collaboratorId),
        [validFields],
    );

    const [showCards, setShowCards] = useState(validFields.length > 0);
    const [showEmptyMessage, setShowEmptyMessage] = useState(
        validFields.length === 0,
    );

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

    const selectedCollaborators = useCallback(
        (searchCollaboratorIds: string[]) =>
            searchCollaborators('').filter(c =>
                searchCollaboratorIds.includes(c.id),
            ),
        [],
    );

    const addCollaborator = useCallback(
        (collaborator: Collaborator) => {
            append({
                collaboratorId: collaborator.id,
                justification: '',
            });
            setSearchQuery('');
        },
        [append, setSearchQuery],
    );

    const removeCollaborator = useCallback(
        async (collaboratorId: string) => {
            const currentReferences = getValues('references') || [];
            const newReferences = currentReferences.filter(
                ref => ref.collaboratorId !== collaboratorId,
            );

            setValue('references', newReferences);
        },
        [getValues, setValue],
    );

    const renderItem = useCallback(
        (collaborator: Collaborator) => (
            <CollaboratorCard collaborator={collaborator} variant="compact" />
        ),
        [],
    );

    const excludeItems = useMemo(
        () => selectedCollaborators(selectedCollaboratorIds),
        [selectedCollaborators, selectedCollaboratorIds],
    );

    return (
        <section>
            <div className="mb-8">
                <SearchBar<Collaborator>
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Buscar por colaboradores"
                    className="w-full"
                    searchFunction={searchCollaborators}
                    onItemSelect={addCollaborator}
                    renderItem={renderItem}
                    excludeItems={excludeItems}
                    getItemKey={collaborator => collaborator.id}
                    noResultsMessage="Nenhum colaborador encontrado"
                />
            </div>

            {showCards && (
                <div className="space-y-6">
                    <AnimatePresence>
                        {validFields.map((field, validIndex) => {
                            const collaborator = searchCollaborators('').find(
                                c => c.id === field.collaboratorId,
                            );
                            if (!collaborator) return null;

                            const originalIndex = fields.findIndex(
                                f => f.id === field.id,
                            );
                            const fieldName = `references.${originalIndex}.justification`;

                            return (
                                <AnimatedCard
                                    key={`ref-${field.collaboratorId}`}
                                    index={validIndex}
                                >
                                    <Reference
                                        collaborator={collaborator}
                                        onRemove={() =>
                                            removeCollaborator(
                                                field.collaboratorId,
                                            )
                                        }
                                        name={fieldName}
                                    />
                                </AnimatedCard>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}

            <AnimatePresence>
                {showEmptyMessage && (
                    <motion.div
                        key="empty-message"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="text-center py-12"
                    >
                        <Typography variant="body" className="text-gray-500">
                            Nenhuma referência adicionada
                        </Typography>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
});
