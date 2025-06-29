import { useEffect, useMemo } from 'react';
import Modal from '../../common/Modal';
import Input from '../../common/Input';
import Button from '../../common/Button';
import Typography from '../../common/Typography';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    getStartCycleSchema,
    type StartCycleSchema,
} from '../../../schemas/startCycleSchema';
import { ErrorMessage } from '../../common/ErrorMessage';
import { getSemesterEndDate, getSemesterStartDate } from '../Sections/utils';

interface StartCycleModalProps {
    open: boolean;
    onClose: () => void;
    onStart: (endDate: string) => void;
    semester: 1 | 2;
    year: number;
}

function StartCycleModal({
    open,
    onClose,
    onStart,
    semester,
    year,
}: StartCycleModalProps) {
    const maxDate = getSemesterEndDate(year, semester);
    const minDate = getSemesterStartDate(year, semester);

    const schema = useMemo(
        () => getStartCycleSchema(minDate, maxDate),
        [minDate, maxDate],
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm<StartCycleSchema>({
        resolver: zodResolver(schema),
        defaultValues: { endDate: '' },
        mode: 'onChange',
    });

    const onSubmit = (data: { endDate: string }) => {
        onStart(data.endDate);
        reset();
    };

    useEffect(() => {
        if (!open) reset();
    }, [open, reset]);

    return (
        <Modal open={open} onClose={onClose}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-4 w-100 flex flex-col gap-4"
            >
                <Typography variant="h2" className="mb-2">
                    Iniciar Ciclo {`${year}.${semester}`}
                </Typography>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label
                            className="text-sm font-medium text-gray-700"
                            htmlFor="end-date-input"
                        >
                            Data de término
                        </label>
                        <ErrorMessage error={errors.endDate?.message} />
                    </div>
                    <Input
                        id="end-date-input"
                        type="date"
                        min={minDate}
                        max={maxDate}
                        {...register('endDate')}
                    />
                </div>
                <div className="flex gap-2 justify-end mt-4">
                    <Button variant="secondary" type="button" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={isSubmitting || !isValid}
                    >
                        Iniciar
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default StartCycleModal;
