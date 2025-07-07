import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';

import { useToast } from '../../../hooks/useToast';
import { useCycle } from '../../../hooks/useCycle';

import type { Criteria } from '../../../types/pillar';

import AddCriterionModal from '../Modals/AddCriterionModal';

import Button from '../../common/Button';
import InputWithTitle from '../../common/InputWithTitle';
import TextAreaWithTitle from '../../common/TextAreaWithTitle';

import { useUpdateCriteriasMutation, useCreateCriteriaMutation } from '../../../hooks/usePillarsQuery';

import { pillarCriteriaFormSchema, type PillarCriteriaFormValues } from '../../../schemas/pillarCriteriaFormSchema';

interface PillarCriteriaCardProps {
    pillarName: string;
    criteria: Criteria[];
    pillarId: number;
    onBack?: () => void;
}

export function PillarCriteriaCard({ pillarName, criteria, pillarId, onBack }: PillarCriteriaCardProps) {

    const { showToast } = useToast();

    const { currentCycle: { isActive: isCycleOpen } = {} } = useCycle();

    const [openIds, setOpenIds] = useState<number[]>([]);
    const [isModified, setIsModified] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const { control, handleSubmit, formState: { isValid, errors }, reset, watch, setValue } = useForm<PillarCriteriaFormValues>({
        resolver: zodResolver(pillarCriteriaFormSchema),
        defaultValues: { criteria },
        mode: 'onChange',
    });

    useEffect(() => {
        const subscription = watch(value => {
            const hasChanged = JSON.stringify(value.criteria) !== JSON.stringify(criteria);
            setIsModified(hasChanged);
        });
        return () => subscription.unsubscribe?.();
    }, [watch, criteria]);

    useEffect(() => {
        reset({ criteria });
    }, [reset, criteria]);

    const { fields } = useFieldArray({
        control,
        name: 'criteria',
    });

    const updateCriteriasMutation = useUpdateCriteriasMutation({
        onUpdateSuccess: () => {
            showToast('Os critérios do pilar foram salvos com sucesso!', 'success', {
                title: 'Critérios atualizados',
                duration: 4000,
            });
        },
        onUpdateError: () => {
            showToast('Tente novamente mais tarde!', 'error', {
                title: 'Erro ao salvar critérios',
                duration: 8000,
            });
        },
    });

    const createCriteriaMutation = useCreateCriteriaMutation({
        onCreateSuccess: () => {
            showToast('Critério adicionado com sucesso!', 'success', {
                title: 'Novo critério',
                duration: 4000,
            });
            setAddModalOpen(false);
        },
        onCreateError: () => {
            showToast('Tente novamente mais tarde.', 'error', {
                title: 'Erro ao adicionar critério',
                duration: 8000,
            });
        },
    });

    const toggleOpen = (id: number) => {
        setOpenIds(prev => (prev.includes(id) ? prev.filter(openId => openId !== id) : [...prev, id]));
    };

    const onSubmit = (data: PillarCriteriaFormValues) => {
        if (isCycleOpen) {
            showToast('Não é possível alterar critérios enquanto o ciclo estiver aberto.', 'error', {
                title: 'Ação não permitida',
                duration: 4000,
            });
            return;
        }
        if (!data.criteria || data.criteria.length === 0) {
            showToast('Adicione pelo menos um critério para salvar.', 'error', {
                title: 'Nenhum critério informado',
                duration: 4000,
            });
            return;
        }
        updateCriteriasMutation.mutate(data);
    };

    const handleAddCriterion = (name: string, description: string) => {
        if (isCycleOpen) {
            showToast('Não é possível adicionar critérios enquanto o ciclo estiver aberto.', 'error', {
                title: 'Ação não permitida',
                duration: 4000,
            });
            return;
        }
        createCriteriaMutation.mutate({ pillarId, name, description });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="bg-white rounded-xl shadow-lg p-4 pt-6 sm:p-8 w-full relative">
                    <div className="flex items-center mb-6 gap-2 justify-between flex-wrap">
                        <div className="flex items-center gap-2 min-w-0">
                            {onBack && (
                                <button className="mr-2 text-primary-500 rounded-full transition-colors cursor-pointer" onClick={onBack} aria-label="Voltar para lista de pilares" tabIndex={0} type="button">
                                    <ArrowLeft size={28} />
                                </button>
                            )}
                            <span className="font-bold text-xl truncate text-primary-700">Critérios de {pillarName}</span>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                            <Button variant="secondary" size="sm" type="submit" disabled={!isValid || !isModified || isCycleOpen || fields.length === 0 || updateCriteriasMutation.isPending} title={isCycleOpen ? 'Não é possível alterar porque o ciclo está aberto' : fields.length === 0 ? 'Adicione pelo menos um critério para salvar' : !isModified ? 'Nenhuma alteração foi feita' : undefined} className="flex-1 sm:flex-none">
                                Salvar alterações
                            </Button>
                            <Button variant="primary" size="sm" type="button" onClick={() => setAddModalOpen(true)} disabled={isCycleOpen || createCriteriaMutation.isPending} title={isCycleOpen ? 'Não é possível adicionar critério com ciclo aberto.' : undefined} className="flex-1 sm:flex-none">
                                Adicionar critério
                            </Button>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200 overflow-y-auto pr-2">
                        {fields.length === 0 ? (
                            <div className="text-center text-gray-400 py-8">Nenhum critério cadastrado para este pilar</div>
                        ) : (
                            fields.map((crit, idx) => {
                                const isOpen = openIds.includes(crit.id);
                                return (
                                    <div key={crit.id} className="bg-white first:pt-0 pt-4 pb-4 last:pb-0 border-b border-gray-200 last:border-b-0">
                                        <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => toggleOpen(crit.id)}>
                                            <span className="font-semibold text-primary-600">{watch(`criteria.${idx}.name`) || 'Novo critério'}</span>
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                                <ChevronDown size={24} />
                                            </div>
                                        </div>
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="p-0 pt-4 grid grid-cols-1 gap-4">
                                                <InputWithTitle
                                                    title="Nome do Critério"
                                                    value={watch(`criteria.${idx}.name`)}
                                                    readOnly={isCycleOpen}
                                                    onChange={e =>
                                                        setValue(`criteria.${idx}.name`, e.target.value, {
                                                            shouldValidate: true,
                                                        })
                                                    }
                                                    error={errors.criteria?.[idx]?.name?.message}
                                                    labelPosition="top"
                                                    maxLength={100}
                                                />
                                                <TextAreaWithTitle title="Descrição" placeholder="Descrição do critério" value={watch(`criteria.${idx}.description`) || ''} readOnly={isCycleOpen} onChange={e => setValue(`criteria.${idx}.description`, e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </form>
            <AddCriterionModal open={isAddModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddCriterion} />
        </>
    );
}
