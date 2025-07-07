import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Modal from '../../common/Modal';
import Input from '../../common/Input';
import Button from '../../common/Button';
import Typography from '../../common/Typography';
import { ErrorMessage } from '../../common/ErrorMessage';

import { formatDate, getDateOnly } from '../../../utils/globalUtils';

import { getExtendCycleSchema, type ExtendCycleSchema } from '../../../schemas/extendCycleSchema';
import { getSemesterEndDate, getSemesterStartDate } from '../../../utils/cycleUtils';

interface ExtendCycleModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (newDate: string) => void;
    currentEndDate: string;
    year: number;
    semester: 1 | 2;
}

function ExtendCycleModal({ open, onClose, onConfirm, currentEndDate, year, semester }: ExtendCycleModalProps) {

    const maxDate = getSemesterEndDate(year, semester);
    const minDate = getSemesterStartDate(year, semester);
    const schema = getExtendCycleSchema(minDate, maxDate, currentEndDate);
    
    const currentDateOnly = getDateOnly(currentEndDate);

    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isValid, errors } } = useForm<ExtendCycleSchema>({
        resolver: zodResolver(schema),
        defaultValues: { endDate: currentDateOnly },
        mode: 'onChange',
    });

    useEffect(() => {
        if (!open) reset({ endDate: currentDateOnly });
    }, [open, reset, currentDateOnly]);

    const onSubmit = (data: { endDate: string }) => {
        const datetimeString = `${data.endDate}T00:00:00.000Z`;
        onConfirm(datetimeString);
        reset({ endDate: currentDateOnly });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 w-100 flex flex-col gap-4">
                <Typography variant="h2" className="mb-2">
                    Prorrogar ciclo
                </Typography>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700" htmlFor="extend-date-input">
                            Nova data de término
                        </label>
                        <ErrorMessage error={errors.endDate?.message} />
                    </div>
                    <Input id="extend-date-input" type="date" min={minDate} max={maxDate} defaultValue={currentDateOnly} {...register('endDate')} />
                </div>
                <Typography variant="body" className="text-gray-700">
                    Data de término atual: <span className="font-semibold">{formatDate(currentEndDate)}</span>
                </Typography>
                <Typography variant="body" className="text-gray-700 -mt-2">
                    Nova data: <span className="font-semibold">{watch('endDate') ? formatDate(watch('endDate')) : '-'}</span>
                </Typography>
                <div className="flex gap-2 justify-end mt-4">
                    <Button variant="secondary" type="button" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" disabled={isSubmitting || !isValid}>
                        Confirmar
                    </Button>
                </div>
            </form>
        </Modal>
    );

}

export default ExtendCycleModal;
