import { useState } from 'react';

import Modal from '../../common/Modal';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Typography from '../../common/Typography';

interface CancelCycleModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    cycleName: string;
}

function CancelCycleModal({ open, onClose, onConfirm, cycleName }: CancelCycleModalProps) {

    const [input, setInput] = useState('');
    const isMatch = input.trim() === cycleName.trim();

    const handleClose = () => {
        setInput('');
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <div className="p-6 bg-white rounded-2xl w-full max-w-lg mx-auto flex flex-col gap-6">
                <header className="flex flex-col gap-2">
                    <Typography variant="h2" className="font-bold text-red-600 text-center">
                        Cancelar ciclo
                    </Typography>
                    <Typography variant="body" className="text-gray-700 font-medium text-center">
                        Tem certeza que deseja cancelar o ciclo?
                        <br />
                        <span className="font-semibold text-red-600">Isso apagará todas as avaliações respondidas até agora!</span>
                    </Typography>
                </header>

                <div className="flex flex-col gap-2">
                    <label htmlFor="confirm-cycle" className="text-sm text-gray-600">
                        Digite <span className="font-bold">{cycleName}</span> para confirmar:
                    </label>
                    <Input id="confirm-cycle" type="text" value={input} onChange={e => setInput(e.target.value)} />
                </div>

                <div className="flex flex-col-reverse md:flex-row justify-end gap-2 mt-2">
                    <Button variant="secondary" onClick={handleClose} className="w-full md:w-auto">
                        Voltar
                    </Button>
                    <Button variant="danger" onClick={onConfirm} disabled={!isMatch} className="w-full md:w-auto">
                        Confirmar cancelamento
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default CancelCycleModal;
