import { Alert } from '@mui/material';
import type { FC } from 'react';

interface AlertMessageProps {
    error?: string | null;
    successMessage?: string | null;
    className?: string;
}

export const AlertMessage: FC<AlertMessageProps> = ({
    error,
    successMessage,
    className = '',
}) => {
    if (!error && !successMessage) return null;

    const isError = Boolean(error);

    return (
        <Alert
            severity={isError ? 'error' : 'success'}
            icon={false}
            className={`!mt-4 !bg-transparent !shadow-none !border-none ${className}`}
            sx={{
                backgroundColor: 'transparent !important',
                color: isError ? '#ef4444' : '#22c55e', 
                textDecoration: 'underline',
                textDecorationColor: isError ? '#ef4444' : '#22c55e',
                textUnderlineOffset: '3px',
                textDecorationThickness: '1.5px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: successMessage ? 'flex-end' : 'flex-start',
                '& .MuiAlert-icon': {
                    display: 'none',
                },
            }}
        >
            {error || successMessage}
        </Alert>
    );
};
