import { useState, type FC, useEffect } from 'react';
import { Typography } from '@mui/material';
import { SquarePen, Save, X, Calendar } from 'lucide-react';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';

const profileDatePickerSlotProps = {
    textField: {
        size: 'small',
        fullWidth: true,
        className: 'bg-neutral-700 p-3 rounded-lg w-full focus:outline-none text-white', 
        InputProps: {
            style: { 
                paddingLeft: '32px',
                color: 'white' 
            },
            readOnly: false,
        },
    },
    
    dialog: {
        sx: {
            '& .MuiPaper-root': {
                backgroundColor: '#500000',
            },
            '& .MuiButton-root': {
                color: 'white !important', 
            },
        },
    },
    
    popper: {
        sx: {
            '& .MuiPaper-root': {
                backgroundColor: '#500000',
            },
            '& .Mui-selected': {
                backgroundColor: '#7a0a0a',
                color: 'white',
            },
            '& .MuiPickersCalendarHeader-root, & .MuiDayPicker-weekDayLabel, & .MuiPickersDay-root, & .MuiSvgIcon-root': {
                color: 'white',
            },
        },
    },
    
    actionBar: {
        sx: {
            '& .MuiButton-root': {
                color: 'white !important',
            },
        },
    },
};

interface ProfileDateFieldProps {
    label: string;
    initialDate: Date | null; 
    onSave: (newValue: Date | null) => Promise<void>; 
}

export const ProfileDateField: FC<ProfileDateFieldProps> = ({ 
    label, 
    initialDate, 
    onSave
}) => {
    const [dateValue, setDateValue] = useState(initialDate); 
    const [isEditing, setIsEditing] = useState(false); 
    const [isSaving, setIsSaving] = useState(false); 
    const [originalDate, setOriginalDate] = useState(initialDate); 
    
    useEffect(() => {
        setDateValue(initialDate);
        setOriginalDate(initialDate);
    }, [initialDate]);

    const datesAreEqual = (date1: Date | null, date2: Date | null) => {
        if (!date1 && !date2) return true;
        if (!date1 || !date2) return false;
        return date1.getTime() === date2.getTime();
    }

    const handleSave = async () => {
        if (datesAreEqual(dateValue, originalDate)) {
            setIsEditing(false); 
            return;
        }

        setIsSaving(true);
        try {
            await onSave(dateValue); 
            setOriginalDate(dateValue);
            setIsEditing(false);
        } catch (error) {
            console.error(`Erro ao salvar ${label}:`, error);
            throw error; 
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setDateValue(originalDate);
        setIsEditing(false);
    };
    
    const displayValue = dateValue ? format(dateValue, 'dd/MM/yyyy') : 'Não informado';

    return (
        <div className='flex flex-col gap-1'>
            <Typography className='text-sm text-gray-400'>{label}</Typography>
            <div className='flex items-center gap-3'>
                <div className='flex-1 relative'>
                    
                    <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
                        <Calendar size={18} />
                    </div>

                    {isEditing ? (
                        <DatePicker
                            value={dateValue}
                            onChange={(newValue) => setDateValue(newValue)}
                            format='dd/MM/yyyy'
                            disabled={isSaving}
                            slotProps={profileDatePickerSlotProps as any}
                            
                        />
                    ) : (
                        <input 
                            type='text' 
                            value={displayValue} 
                            readOnly
                            className='bg-neutral-700 p-3 rounded-lg w-full focus:outline-none text-white pl-10'
                        />
                    )}
                </div>
                
                <div className='flex gap-2'>
                    {isEditing ? (
                        <>
                            <button onClick={handleSave} disabled={isSaving || datesAreEqual(dateValue, originalDate)} title='Salvar' className='text-green-500 hover:text-green-300 disabled:text-gray-500 transition-colors'>
                                {isSaving ? '...' : <Save size={28} />}
                            </button>
                            <button onClick={handleCancel} disabled={isSaving} title='Cancelar' className='text-red-500 hover:text-red-300 disabled:text-gray-500 transition-colors'>
                                <X size={28} />
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} title='Editar' className='text-gray-400 cursor-pointer hover:text-white transition-colors'>
                            <SquarePen size={28} />
                        </button>
                    )}
                </div>
            </div>
            {isSaving && <p className='text-xs text-yellow-500'>Salvando...</p>}
        </div>
    );
};