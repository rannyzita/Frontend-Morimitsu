import { type FC, type ReactNode } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { Calendar } from 'lucide-react';

const datePickerSlotProps = {
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
            '& .MuiPaper-root': { backgroundColor: '#500000' },
            '& .MuiButton-root': { color: 'white !important' },
        },
    },
    popper: {
        sx: {
            '& .MuiPaper-root': { backgroundColor: '#500000' },
            '& .Mui-selected': { backgroundColor: '#7a0a0a', color: 'white' },
            '& .MuiPickersCalendarHeader-root, & .MuiDayPicker-weekDayLabel, & .MuiPickersDay-root, & .MuiSvgIcon-root': {
                color: 'white',
            },
        },
    },
    actionBar: {
        sx: {
            '& .MuiButton-root': { color: 'white !important' },
        },
    },
};

interface DateFormFieldProps {
    labelComponent: ReactNode; 
    value: Date | null;
    onChange: (date: Date | null) => void;
}

export const DateFormField: FC<DateFormFieldProps> = ({ labelComponent, value, onChange }) => {
    
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <div className='flex flex-col gap-2'>
                <label className='text-gray-400'>{labelComponent}</label>
                <div className='flex-1 relative'>
                    {/* Ícone fixo */}
                    <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
                        <Calendar size={18} />
                    </div>

                    <DatePicker
                        value={value}
                        onChange={onChange}
                        format='dd/MM/yyyy'
                        slotProps={datePickerSlotProps as any}
                    />
                </div>
            </div>
        </LocalizationProvider>
    );
};