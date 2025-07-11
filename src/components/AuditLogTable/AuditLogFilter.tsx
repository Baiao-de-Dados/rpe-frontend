import { GROUP_OPTIONS } from '../../utils/auditLogTableUtils';
import type { GroupByType } from '../../utils/auditLogTableUtils';
import { FormControl, InputLabel, Select, MenuItem, TextField, Box } from "@mui/material";
import type { AuditLogEntry } from '../../data/mockAdmin';

interface AuditLogFilterProps {
    groupBy: GroupByType;
    setGroupBy: (value: GroupByType) => void;
    dateTime: string;
    setDateTime: (value: string) => void;
    actionFilter: string;
    setActionFilter: (value: string) => void;
    actions: AuditLogEntry['action'][];
    search: string;
    setSearch: (value: string) => void;
}

export default function AuditLogFilter({ groupBy, setGroupBy, dateTime, setDateTime, actionFilter, setActionFilter, actions, search, setSearch }: AuditLogFilterProps) {
    return (
        <Box
            display="flex"
            width="100%"
            alignItems="center"
            gap={2}
            flexWrap="wrap"
            sx={{
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'stretch', md: 'center' },
            }}
        >
            <Box flex={1} sx={{ width: { xs: '100%', md: 'auto' } }}>
                <TextField
                    label="Pesquisar"
                    size="small"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar nos logs..."
                    InputLabelProps={{
                        shrink: true,
                        style: {
                            color: 'var(--color-neutral-700)',
                        },
                    }}
                    sx={{
                        width: '100%',
                        minWidth: 220,
                        '& .MuiInputBase-input': {
                            color: 'var(--color-primary-700)',
                            fontWeight: 500,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-primary-500) !important' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-primary-500) !important' },
                        '& .MuiInputLabel-root': {
                            color: 'var(--color-neutral-700)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'var(--color-primary-700)',
                        },
                        '& .MuiOutlinedInput-root': {
                            boxShadow: 'none',
                        },
                        '& .MuiOutlinedInput-root.Mui-focused': {
                            boxShadow: 'none',
                        },
                        '& .MuiInputBase-root:after': {
                            borderBottom: 'none',
                        },
                    }}
                    inputProps={{
                        style: {
                            boxShadow: 'none',
                            borderColor: 'var(--color-primary-500)',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        },
                    }}
                />
            </Box>
            <Box display="flex" gap={2} sx={{ width: { xs: '100%', md: 'auto' }, flexDirection: { xs: 'column', md: 'row' } }}>
                <FormControl size="small" sx={{ width: { xs: '100%', md: 260 }, maxWidth: { md: 260 }, minWidth: { md: 180 } }}>
                    <InputLabel id="action-filter-label"
                        shrink
                        sx={{
                            color: 'var(--color-neutral-700)',
                            '&.Mui-focused': { color: 'var(--color-primary-700)' },
                            '&.MuiInputLabel-shrink': { color: 'var(--color-primary-700)' }
                        }}
                    >Filtrar por Ação</InputLabel>
                    <Select
                        labelId="action-filter-label"
                        value={actionFilter}
                        label="Filtrar por Ação"
                        onChange={e => setActionFilter(e.target.value)}
                        displayEmpty
                        sx={{
                            width: { xs: '100%', md: 260 },
                            maxWidth: { md: 260 },
                            minWidth: { md: 180 },
                            '& .MuiSelect-select': {
                                color: 'var(--color-primary-700)',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                            },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-primary-500)' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-primary-500)' },
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    maxWidth: 260,
                                    '& .MuiMenuItem-root.Mui-selected, & .MuiMenuItem-root.Mui-selected:hover': {
                                        color: 'var(--color-primary-700)',
                                        backgroundColor: 'var(--color-primary-100)',
                                    },
                                    '& .MuiMenuItem-root:hover': {
                                        color: 'var(--color-primary-500)',
                                    },
                                },
                            },
                        }}
                    >
                        <MenuItem value="">Todas</MenuItem>
                        {actions.map(action => (
                            <MenuItem key={action} value={action}>{action}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Filtrar por Data/Hora"
                    type="datetime-local"
                    size="small"
                    value={dateTime}
                    onChange={e => setDateTime(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                        style: {
                            color: 'var(--color-neutral-700)',
                        },
                    }}
                    sx={{
                        width: { xs: '100%', md: 220 },
                        maxWidth: { md: 220 },
                        minWidth: { md: 220 },
                        '& .MuiInputBase-input': {
                            color: 'var(--color-primary-700)',
                            fontWeight: 500,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-primary-500) !important' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-primary-500) !important' },
                        '& .MuiInputLabel-root': {
                            color: 'var(--color-neutral-700)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'var(--color-primary-700)',
                        },
                        '& .MuiOutlinedInput-root': {
                            boxShadow: 'none',
                        },
                        '& .MuiOutlinedInput-root.Mui-focused': {
                            boxShadow: 'none',
                        },
                        '& .MuiInputBase-root:after': {
                            borderBottom: 'none',
                        },
                    }}
                    inputProps={{
                        style: {
                            boxShadow: 'none',
                            borderColor: 'var(--color-primary-500)',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        },
                    }}
                />
                <FormControl size="small" sx={{ width: { xs: '100%', md: 200 }, maxWidth: { md: 200 }, minWidth: { md: 200 } }}>
                    <InputLabel id="group-by-label"
                        sx={{
                            color: 'var(--color-neutral-700)',
                            '&.Mui-focused': { color: 'var(--color-primary-700)' },
                            '&.MuiInputLabel-shrink': { color: 'var(--color-primary-700)' }
                        }}
                    >
                        Agrupar por
                    </InputLabel>
                    <Select
                        labelId="group-by-label"
                        value={groupBy}
                        label="Agrupar por"
                        onChange={(e) => setGroupBy(e.target.value as GroupByType)}
                        sx={{
                            width: { xs: '100%', md: 200 },
                            maxWidth: { md: 200 },
                            minWidth: { md: 200 },
                            '& .MuiSelect-select': {
                                color: 'var(--color-primary-700)',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                            },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-primary-500)' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-primary-500)' },
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    maxWidth: 200,
                                    '& .MuiMenuItem-root': {
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                    },
                                    '& .MuiMenuItem-root.Mui-selected, & .MuiMenuItem-root.Mui-selected:hover': {
                                        color: 'var(--color-primary-700)',
                                        backgroundColor: 'var(--color-primary-100)',
                                    },
                                    '& .MuiMenuItem-root:hover': {
                                        color: 'var(--color-primary-500)',
                                    },
                                },
                            },
                        }}
                    >
                        {GROUP_OPTIONS.map(opt => (
                            <MenuItem
                                key={opt.value}
                                value={opt.value}
                                sx={{
                                    '&.Mui-selected': {
                                        color: 'var(--color-primary-700)',
                                        backgroundColor: 'var(--color-primary-100)',
                                    },
                                    '&.Mui-selected:hover': {
                                        color: 'var(--color-primary-700)',
                                        backgroundColor: 'var(--color-primary-100)',
                                    },
                                    '&:hover': {
                                        color: 'var(--color-primary-500)',
                                    },
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
}
