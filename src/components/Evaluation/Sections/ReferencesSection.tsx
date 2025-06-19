import { AnimatePresence, motion } from 'framer-motion';
import SearchBar from '../../Searchbar';
import Typography from '../../Typography';
import AnimatedCard from '../../AnimatedCard';
import CollaboratorCard from '../../CollaboratorCard';
import ReferenceCard from '../Cards/Reference';
import {
    searchCollaborators,
    type Collaborator,
    type CollaboratorEvaluation,
} from '../../../data/mockCollaborators';

interface ReferencesSectionProps {
    searchQueryReference: string;
    setSearchQueryReference: (query: string) => void;
    selectedCollaboratorsReference: Collaborator[];
    collaboratorEvaluationsReference: Record<string, CollaboratorEvaluation>;
    addCollaboratorToReference: (collaborator: Collaborator) => void;
    removeCollaboratorFromReference: (collaboratorId: string) => void;
    updateCollaboratorFieldReference: (
        collaboratorId: string,
        field: 'pontosFortes' | 'pontosMelhoria' | 'referencia',
        value: string,
    ) => void;
}

export function ReferencesSection({
    searchQueryReference,
    setSearchQueryReference,
    selectedCollaboratorsReference,
    collaboratorEvaluationsReference,
    addCollaboratorToReference,
    removeCollaboratorFromReference,
    updateCollaboratorFieldReference,
}: ReferencesSectionProps) {
    return (
        <section>
            <div className="mb-8">
                <div className="mb-6 relative">
                    <SearchBar<Collaborator>
                        value={searchQueryReference}
                        onChange={setSearchQueryReference}
                        placeholder="Buscar por colaboradores"
                        className="w-full"
                        searchFunction={searchCollaborators}
                        onItemSelect={addCollaboratorToReference}
                        renderItem={collaborator => (
                            <CollaboratorCard
                                collaborator={collaborator}
                                variant="compact"
                            />
                        )}
                        excludeItems={selectedCollaboratorsReference}
                        getItemKey={collaborator => collaborator.id}
                        noResultsMessage="Nenhum colaborador encontrado"
                    />
                </div>
            </div>

            {selectedCollaboratorsReference.length > 0 ? (
                <div className="space-y-6">
                    <AnimatePresence>
                        {selectedCollaboratorsReference.map(
                            (collaborator, index) => {
                                const evaluation =
                                    collaboratorEvaluationsReference[
                                        collaborator.id
                                    ];
                                return (
                                    <AnimatedCard
                                        key={collaborator.id}
                                        index={index}
                                    >
                                        <ReferenceCard
                                            collaborator={collaborator}
                                            evaluation={evaluation}
                                            onClearReference={
                                                removeCollaboratorFromReference
                                            }
                                            onFieldChange={
                                                updateCollaboratorFieldReference
                                            }
                                        />
                                    </AnimatedCard>
                                );
                            },
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Typography variant="body" className="text-gray-500">
                        Indique colaboradores como referências
                    </Typography>
                </motion.div>
            )}
        </section>
    );
}
