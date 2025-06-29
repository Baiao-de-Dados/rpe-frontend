import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    addCriterionSchema,
    type AddCriterionFormValues,
} from '../../schemas/addCriterionSchema';
import Modal from '../common/Modal';
import InputWithTitle from '../common/InputWithTitle';
import TextAreaWithTitle from '../common/TextAreaWithTitle';
import Button from '../common/Button';
import Typography from '../common/Typography';

interface AddCriterionModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: {
        name: string;
        description: string;
        pillarId: string;
    }) => void;
    pillarId: string;
}

export default function AddCriterionModal({
    open,
    onClose,
    onAdd,
    pillarId,
}: AddCriterionModalProps) {
    const form = useForm<AddCriterionFormValues>({
        resolver: zodResolver(addCriterionSchema),
        defaultValues: { name: '', description: '' },
        mode: 'onChange',
    });

    const handleSubmit = (values: AddCriterionFormValues) => {
        onAdd({
            name: values.name,
            description: values.description ?? '',
            pillarId,
        });
        form.reset();
        onClose();
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose} className="max-w-5xl w-full">
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="p-4 w-full max-w-5xl mx-auto"
            >
                <Typography variant="h2" className="mb-8">
                    Adicionar novo critério
                </Typography>
                <div className="flex flex-col gap-4">
                    <InputWithTitle
                        title="Nome do Critério"
                        placeholder="Nome do critério"
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
                    <TextAreaWithTitle
                        title="Descrição"
                        placeholder="Descrição do critério"
                        value={form.watch('description') || ''}
                        onChange={e =>
                            form.setValue('description', e.target.value)
                        }
                        error={form.formState.errors.description?.message}
                        maxLength={500}
                    />
                </div>
                <div className="flex gap-2 mt-8 justify-end">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={!form.formState.isValid}
                    >
                        Adicionar
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
