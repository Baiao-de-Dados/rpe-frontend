import { AnimatePresence, motion } from 'framer-motion';
import SearchBar from '../../Searchbar';
import Typography from '../../Typography';
import AnimatedCard from '../../AnimatedCard';
import CollaboratorCard from '../../CollaboratorCard';
import CollaboratorEvaluation360 from '../Cards/Evaluation360';
import {
    searchCollaborators,
    type Collaborator,
    type CollaboratorEvaluation,
} from '../../../data/mockCollaborators';

interface Evaluation360SectionProps {
    searchQuery360: string;
    setSearchQuery360: (query: string) => void;
    selectedCollaborators360: Collaborator[];
    collaboratorEvaluations360: Record<string, CollaboratorEvaluation>;
    addCollaboratorTo360: (collaborator: Collaborator) => void;
    removeCollaboratorFrom360: (collaboratorId: string) => void;
    updateCollaboratorRating360: (
        collaboratorId: string,
        rating: number | null,
    ) => void;
    updateCollaboratorField360: (
        collaboratorId: string,
        field: 'pontosFortes' | 'pontosMelhoria' | 'referencia',
        value: string,
    ) => void;
}

export function Evaluation360Section({
    searchQuery360,
    setSearchQuery360,
    selectedCollaborators360,
    collaboratorEvaluations360,
    addCollaboratorTo360,
    removeCollaboratorFrom360,
    updateCollaboratorRating360,
    updateCollaboratorField360,
}: Evaluation360SectionProps) {
    return (
        <section>
            <div className="mb-8">
                <div className="mb-6 relative">
                    <SearchBar<Collaborator>
                        value={searchQuery360}
                        onChange={setSearchQuery360}
                        placeholder="Buscar por colaboradores"
                        className="w-full"
                        searchFunction={searchCollaborators}
                        onItemSelect={addCollaboratorTo360}
                        renderItem={collaborator => (
                            <CollaboratorCard
                                collaborator={collaborator}
                                variant="compact"
                            />
                        )}
                        excludeItems={selectedCollaborators360}
                        getItemKey={collaborator => collaborator.id}
                        noResultsMessage="Nenhum colaborador encontrado"
                    />
                </div>
            </div>

            {selectedCollaborators360.length > 0 ? (
                <div className="space-y-6">
                    <AnimatePresence>
                        {selectedCollaborators360.map((collaborator, index) => {
                            const evaluation =
                                collaboratorEvaluations360[collaborator.id];
                            return (
                                <AnimatedCard
                                    key={collaborator.id}
                                    index={index}
                                >
                                    <CollaboratorEvaluation360
                                        collaborator={collaborator}
                                        evaluation={evaluation}
                                        onClearEvaluation={
                                            removeCollaboratorFrom360
                                        }
                                        onRatingChange={
                                            updateCollaboratorRating360
                                        }
                                        onFieldChange={
                                            updateCollaboratorField360
                                        }
                                    />
                                </AnimatedCard>
                            );
                        })}
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
                        Busque um colaborador para começar a Avaliação 360
                    </Typography>
                </motion.div>
            )}
        </section>
    );
}
