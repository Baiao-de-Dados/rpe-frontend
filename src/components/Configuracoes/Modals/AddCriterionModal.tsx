import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Modal from '../../common/Modal';
import Button from '../../common/Button';
import Typography from '../../common/Typography';
import InputWithTitle from '../../common/InputWithTitle';
import TextAreaWithTitle from '../../common/TextAreaWithTitle';

import { addCriterionSchema, type AddCriterionFormValues } from '../../../schemas/addCriterionSchema';

interface AddCriterionModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (name: string, description: string) => void;
}

export default function AddCriterionModal({ open, onClose, onAdd }: AddCriterionModalProps) {

    const { handleSubmit, reset, watch, setValue, formState: { errors, isValid } } = useForm<AddCriterionFormValues>({
        resolver: zodResolver(addCriterionSchema),
        defaultValues: { name: '', description: '' },
        mode: 'onChange',
    });

    const onSubmit = (values: AddCriterionFormValues) => {
        onAdd(values.name, values.description ?? '');
        reset();
        onClose();
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose} className="max-w-5xl w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 w-full max-w-5xl mx-auto">
                <Typography variant="h2" className="mb-8">
                    Adicionar novo critério
                </Typography>
                <div className="flex flex-col gap-4">
                    <InputWithTitle title="Nome do Critério" placeholder="Nome do critério" value={watch('name')} error={errors.name?.message}autoFocus maxLength={100} labelPosition="top"
                    onChange={e =>
                            setValue('name', e.target.value, {
                                shouldValidate: true,
                            })
                        }/>
                    <TextAreaWithTitle title="Descrição" placeholder="Descrição do critério" value={watch('description') || ''} 
                    onChange={e => setValue('description', e.target.value)} error={errors.description?.message} maxLength={500}/>
                </div>
                <div className="flex gap-2 mt-8 justify-end">
                    <Button type="button" variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary" disabled={!isValid}>
                        Adicionar
                    </Button>
                </div>
            </form>
        </Modal>
    );

}
