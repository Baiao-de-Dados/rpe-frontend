import { useQueryState } from 'nuqs';
import { AnimatePresence, motion } from 'framer-motion';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useEffect, useState, useCallback, useMemo, memo } from 'react';

import Reference from '../Cards/Reference';
import SearchBar from '../../common/Searchbar';
import Typography from '../../common/Typography';
import AnimatedCard from '../../common/AnimatedCard';
import CollaboratorCard from '../../common/CollaboratorCard';

import type { Collaborator } from '../../../data/mockCollaborators';
import { searchCollaborators } from '../../../data/mockCollaborators';

import type { EvaluationFormData } from '../../../schemas/evaluation';

import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

export const ReferencesSection = memo(() => {

    const { variants } = useOptimizedAnimation();

    const { control, setValue, getValues } = useFormContext<EvaluationFormData>();

    const [searchQuery, setSearchQuery] = useQueryState('ref_search', {
        defaultValue: '',
        history: 'replace',
    });

    const { fields, append } = useFieldArray({
        control,
        name: 'references',
    });

    const validFields = useMemo(
        () => {
            const valid = fields.filter(field => field.collaboratorId);
            console.log('📋 All fields:', fields);
            console.log('✅ Valid fields:', valid);
            return valid;
        },
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
        console.log('📊 Valid fields length changed:', validFields.length);
        console.log('📊 Valid fields:', validFields);
        
        if (validFields.length > 0) {
            console.log('✅ Showing cards');
            setShowCards(true);
            setShowEmptyMessage(false);
        } else {
            console.log('❌ No valid fields, will show empty message');
            const timeout = setTimeout(() => {
                setShowCards(false);
                setShowEmptyMessage(true);
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [validFields.length, validFields]);

    const selectedCollaborators = useCallback((searchCollaboratorIds: string[]) => {
            return searchCollaborators('').filter(c => searchCollaboratorIds.includes(c.id))
        },
        []
    );

    const addCollaborator = useCallback((collaborator: Collaborator) => { 
            console.log('🔍 Adding collaborator:', collaborator);
            console.log('📋 Fields before append:', fields);
            
            // Verificar se o colaborador já foi adicionado
            const alreadyExists = fields.some(field => field.collaboratorId === collaborator.id);
            if (alreadyExists) {
                console.log('⚠️ Collaborator already exists, skipping');
                return;
            }
            
            append({collaboratorId: collaborator.id, justification: ''});
            console.log('✅ Collaborator added to form');
        },
        [append, fields]
    );

    const removeCollaborator = useCallback(async (collaboratorId: string) => {
            const currentReferences = getValues('references') || [];
            const newReferences = currentReferences.filter(ref => ref.collaboratorId !== collaboratorId);
            setValue('references', newReferences);
        },
        [getValues, setValue],
    );

    const renderItem = useCallback((collaborator: Collaborator) => 
        <CollaboratorCard collaborator={collaborator} variant="compact" />,
        [],
    );

    const excludeItems = useMemo(() => 
        selectedCollaborators(selectedCollaboratorIds),
        [selectedCollaborators, selectedCollaboratorIds],
    );

    console.log('🎨 Component render - showCards:', showCards, 'validFields length:', validFields.length, 'showEmptyMessage:', showEmptyMessage);

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
                            console.log('🔍 Processing field:', field, 'validIndex:', validIndex);
                            const collaborator = searchCollaborators('').find(c => c.id === field.collaboratorId);
                            console.log('👤 Found collaborator:', collaborator);
                            
                            if (!collaborator) {
                                console.log('❌ No collaborator found for field:', field);
                                return null;
                            }

                            const originalIndex = fields.findIndex(f => f.id === field.id);
                            const fieldName = `references.${originalIndex}.justification`;
                            console.log('📝 Field name:', fieldName, 'originalIndex:', originalIndex);

                            return (
                                <AnimatedCard key={`ref-${field.collaboratorId}`} index={validIndex}>
                                    <Reference collaborator={collaborator} name={fieldName}
                                        onRemove={() =>
                                            removeCollaborator(
                                                field.collaboratorId,
                                            )
                                        }
                                    />
                                </AnimatedCard>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}

            <AnimatePresence>
                {showEmptyMessage && (
                    <motion.div key="empty-message" variants={variants.emptyMessage} initial="initial" animate="animate" exit="exit" className="text-center py-12">
                        <Typography variant="body" className="text-gray-500">
                            Nenhuma referência adicionada
                        </Typography>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
});