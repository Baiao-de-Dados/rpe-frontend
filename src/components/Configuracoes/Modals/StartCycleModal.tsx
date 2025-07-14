import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Modal from '../../common/Modal';
import Input from '../../common/Input';
import Button from '../../common/Button';
import Typography from '../../common/Typography';
import { ErrorMessage } from '../../common/ErrorMessage';

import { getBrazilDateString } from '../../../utils/globalUtils';
import { getSemesterEndDate, getSemesterStartDate } from '../../../utils/cycleUtils';

import { getStartCycleSchema, type StartCycleSchema } from '../../../schemas/startCycleSchema';

interface StartCycleModalProps {
    open: boolean;
    onClose: () => void;
    onStart: (startDate: string, endDate: string ) => void;
    semester: 1 | 2;
    year: number;
}

function StartCycleModal({ open, onClose, onStart, semester, year }: StartCycleModalProps) {

    const maxDate = getSemesterEndDate(year, semester);
    const minDate = getSemesterStartDate(year, semester);

    const schema = useMemo(() => getStartCycleSchema(minDate, maxDate), [minDate, maxDate]);

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid }, reset } = useForm<StartCycleSchema>({
        resolver: zodResolver(schema),
        defaultValues: { startDate: getBrazilDateString(), endDate: '' },
        mode: 'onChange',
    });

    const onSubmit = (data: { startDate: string; endDate: string }) => {
        onStart(data.startDate, data.endDate);
        reset();
    };

    useEffect(() => {
        if (!open) reset();
    }, [open, reset]);

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 w-100 flex flex-col gap-4">
                <Typography variant="h2" className="mb-2">
                    Iniciar Ciclo {`${year}.${semester}`}
                </Typography>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700" htmlFor="start-date-input">
                            Data de início
                        </label>
                        <ErrorMessage error={errors.startDate?.message} />
                    </div>
                    <Input id="start-date-input" type="date" min={minDate} max={maxDate} {...register('startDate')} />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700" htmlFor="end-date-input">
                            Data de término
                        </label>
                        <ErrorMessage error={errors.endDate?.message} />
                    </div>
                    <Input id="end-date-input" type="date" min={minDate} max={maxDate} {...register('endDate')} />
                </div>
                <div className="flex gap-2 justify-end mt-4">
                    <Button variant="secondary" type="button" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" disabled={isSubmitting || !isValid}>
                        Iniciar
                    </Button>
                </div>
            </form>
        </Modal>
    );

}

export default StartCycleModal;
