import { ArrowLeft, ChevronDown } from 'lucide-react';
import InputWithTitle from '../../common/InputWithTitle';
import TextAreaWithTitle from '../../common/TextAreaWithTitle';
import { useState } from 'react';
import Button from '../../common/Button';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    pillarCriteriaFormSchema,
    type PillarCriteriaFormValues,
} from '../../../schemas/pillarCriteriaFormSchema';
import { useToast } from '../../../hooks/useToast';
import AddCriterionModal from '../AddCriterionModal';

interface PillarCriteriaCardProps {
    title: string;
    criteria: { id: string; name: string; description?: string }[];
    pillarId: string;
    isCycleOpen?: boolean;
    onBack?: () => void;
}

export function PillarCriteriaCard({
    title,
    criteria,
    pillarId,
    onBack,
    isCycleOpen = true,
}: PillarCriteriaCardProps) {
    const [openIds, setOpenIds] = useState<string[]>([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const { showToast } = useToast();

    const form = useForm<PillarCriteriaFormValues>({
        resolver: zodResolver(pillarCriteriaFormSchema),
        defaultValues: { criteria },
        mode: 'onChange',
    });

    const { fields } = useFieldArray({
        control: form.control,
        name: 'criteria',
    });

    const toggleOpen = (id: string) => {
        setOpenIds(prev =>
            prev.includes(id)
                ? prev.filter(openId => openId !== id)
                : [...prev, id],
        );
    };

    const onSubmit = (data: PillarCriteriaFormValues) => {
        if (isCycleOpen) {
            showToast(
                'Não é possível alterar critérios enquanto o ciclo estiver aberto.',
                'error',
                {
                    title: 'Ação não permitida',
                    duration: 4000,
                },
            );
            return;
        }
        console.log('Dados salvos:', data);
        showToast(
            'Os critérios do pilar foram salvos com sucesso!',
            'success',
            {
                title: 'Critérios atualizados',
                duration: 4000,
            },
        );
    };

    const handleAddCriterion = (data: {
        name: string;
        description: string;
    }) => {
        if (isCycleOpen) {
            showToast(
                'Não é possível adicionar critérios enquanto o ciclo estiver aberto.',
                'error',
                {
                    title: 'Ação não permitida',
                    duration: 4000,
                },
            );
            return;
        }
        console.log(data);
        showToast('Critério adicionado com sucesso!', 'success', {
            title: 'Novo critério',
            duration: 4000,
        });
        setAddModalOpen(false);
    };

    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="bg-white rounded-xl shadow-lg p-4 pt-6 sm:p-8 w-full relative">
                    <div className="flex items-center mb-6 gap-2 justify-between flex-wrap">
                        <div className="flex items-center gap-2 min-w-0">
                            {onBack && (
                                <button
                                    className="mr-2 text-primary-500 rounded-full transition-colors cursor-pointer"
                                    onClick={onBack}
                                    aria-label="Voltar para lista de pilares"
                                    tabIndex={0}
                                    type="button"
                                >
                                    <ArrowLeft size={28} />
                                </button>
                            )}
                            <span className="font-bold text-xl truncate text-primary-700">
                                Critérios de {title}
                            </span>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                            <Button
                                variant="secondary"
                                size="sm"
                                type="submit"
                                disabled={isCycleOpen}
                                title={
                                    isCycleOpen
                                        ? 'Não é possível alterar porque o ciclo está aberto.'
                                        : undefined
                                }
                                className="flex-1 sm:flex-none"
                            >
                                Salvar alterações
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                type="button"
                                onClick={() => setAddModalOpen(true)}
                                disabled={isCycleOpen}
                                title={
                                    isCycleOpen
                                        ? 'Não é possível adicionar critério com ciclo aberto.'
                                        : undefined
                                }
                                className="flex-1 sm:flex-none"
                            >
                                Adicionar critério
                            </Button>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200 overflow-y-auto pr-2">
                        {fields.map((crit, idx) => {
                            const isOpen = openIds.includes(crit.id);
                            return (
                                <div
                                    key={crit.id}
                                    className="bg-white first:pt-0 pt-4 pb-4 last:pb-0 border-b border-gray-200 last:border-b-0"
                                >
                                    <div
                                        className="flex items-center justify-between cursor-pointer select-none"
                                        onClick={() => toggleOpen(crit.id)}
                                    >
                                        <span className="font-semibold text-primary-600">
                                            {form.watch(
                                                `criteria.${idx}.name`,
                                            ) || 'Novo critério'}
                                        </span>
                                        <div
                                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
                                                isOpen
                                                    ? 'rotate-180'
                                                    : 'rotate-0'
                                            }`}
                                        >
                                            <ChevronDown size={24} />
                                        </div>
                                    </div>
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                            isOpen
                                                ? 'max-h-[500px] opacity-100'
                                                : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        <div className="p-0 pt-4 grid grid-cols-1 gap-4">
                                            <InputWithTitle
                                                title="Nome do Critério"
                                                value={form.watch(
                                                    `criteria.${idx}.name`,
                                                )}
                                                readOnly={isCycleOpen}
                                                onChange={e =>
                                                    form.setValue(
                                                        `criteria.${idx}.name`,
                                                        e.target.value,
                                                        {
                                                            shouldValidate:
                                                                true,
                                                        },
                                                    )
                                                }
                                                error={
                                                    form.formState.errors
                                                        .criteria?.[idx]?.name
                                                        ?.message
                                                }
                                            />
                                            <TextAreaWithTitle
                                                title="Descrição"
                                                placeholder="Descrição do critério"
                                                value={
                                                    form.watch(
                                                        `criteria.${idx}.description`,
                                                    ) || ''
                                                }
                                                readOnly={isCycleOpen}
                                                onChange={e =>
                                                    form.setValue(
                                                        `criteria.${idx}.description`,
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </form>
            <AddCriterionModal
                open={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onAdd={handleAddCriterion}
                pillarId={pillarId}
            />
        </>
    );
}
