import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addPillarSchema, type AddPillarFormValues } from '../../../schemas/addPillarSchema';
import Modal from '../../common/Modal';
import InputWithTitle from '../../common/InputWithTitle';
import Button from '../../common/Button';
import Typography from '../../common/Typography';
import { useCycle } from '../../../hooks/useCycle';
import { useToast } from '../../../hooks/useToast';
import { pillarEndpoints } from '../../../services/api/pillar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PILLARS_QUERY_KEY } from '../../../hooks/usePillarsQuery';

interface AddPillarModalProps {
    open: boolean;
    onClose: () => void;
}

export default function AddPillarModal({ open, onClose }: AddPillarModalProps) {
    const form = useForm<AddPillarFormValues>({
        resolver: zodResolver(addPillarSchema),
        defaultValues: { name: '' },
        mode: 'onChange',
    });

    const { showToast } = useToast();
    const { currentCycle } = useCycle();
    const isCycleOpen = currentCycle?.isOpen;
    const queryClient = useQueryClient();
    const createPillarMutation = useMutation({
        mutationFn: pillarEndpoints.createPillar,
        onSuccess: () => {
            showToast('Pilar adicionado com sucesso!', 'success', {
                title: 'Novo pilar',
                duration: 4000,
            });
            form.reset();
            onClose();
            queryClient.invalidateQueries({ queryKey: PILLARS_QUERY_KEY });
        },
        onError: () => {
            showToast('Tente novamente mais tarde.', 'error', {
                title: 'Erro ao criar pilar',
                duration: 8000,
            });
            form.reset();
            onClose();
        },
    });

    const handleSubmit = (data: AddPillarFormValues) => {
        if (isCycleOpen) {
            showToast('Não é possível adicionar pilares enquanto o ciclo estiver aberto', 'error', {
                title: 'Ação não permitida',
                duration: 4000,
            });
            return;
        }
        createPillarMutation.mutate({ name: data.name });
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose} className="max-w-lg w-full">
            <form onSubmit={form.handleSubmit(handleSubmit)} className="p-4 w-full max-w-lg mx-auto">
                <Typography variant="h2" className="mb-8">
                    Adicionar novo pilar
                </Typography>
                <div className="flex flex-col gap-4">
                    <InputWithTitle
                        title="Nome do Pilar"
                        placeholder="Nome do pilar"
                        value={form.watch('name')}
                        onChange={e =>
                            form.setValue('name', e.target.value, {
                                shouldValidate: true,
                            })
                        }
                        error={form.formState.errors.name?.message}
                        autoFocus
                        maxLength={100}
                        labelPosition="top"
                    />
                </div>
                <div className="flex gap-2 mt-8 justify-end">
                    <Button type="button" variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary" disabled={!form.formState.isValid || isCycleOpen || createPillarMutation.isPending} title={isCycleOpen ? 'Não é possível adicionar pilares porque o ciclo está aberto.' : undefined}>
                        {createPillarMutation.isPending ? 'Adicionando...' : 'Adicionar'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
