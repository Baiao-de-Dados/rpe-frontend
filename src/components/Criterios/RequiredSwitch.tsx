import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

interface RequiredSwitchProps {
    value: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
}

const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: 56,
    height: 36,
    padding: 8,
    '& .MuiSwitch-switchBase': {
        padding: 6,
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(20px)',
            '& + .MuiSwitch-track': {
                backgroundColor: 'var(--color-primary-500)',
                opacity: 1,
            },
        },
    },
    '& .MuiSwitch-thumb': {
        width: 24,
        height: 24,
    },
    '& .MuiSwitch-track': {
        borderRadius: 20,
        backgroundColor: 'var(--color-primary-200)',
        opacity: 0.5,
        transition: theme.transitions.create(['background-color'], {
            duration: 300,
        }),
    },
}));

export function RequiredSwitch({
    value,
    onChange,
    disabled = false,
}: RequiredSwitchProps) {
    return (
        <CustomSwitch
            checked={value}
            onChange={e => onChange(e.target.checked)}
            onClick={e => e.stopPropagation()}
            disabled={disabled}
        />
    );
}
