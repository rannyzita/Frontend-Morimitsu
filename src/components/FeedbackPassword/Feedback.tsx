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

    return (
        <Alert
            severity={error ? 'error' : 'success'}
            className={`!mt-4 ${successMessage ? '!bg-green-700/10 !text-green-400 !border !border-green-600' : ''} ${className}`}
            sx={{
                '& .MuiAlert-root': {
                display: 'flex',
                flexDirection: successMessage ? 'row-reverse' : 'row',
                justifyContent: successMessage ? 'flex-end' : 'flex-start',
                alignItems: 'center',
                },
                '& .MuiAlert-icon': {
                color: successMessage ? '#34D399 !important' : 'inherit',
                marginRight: successMessage ? '0' : '8px',
                marginLeft: successMessage ? '8px' : '0',
                },
                textAlign: successMessage ? 'right' : 'left',
            }}
        >
            {error || successMessage}
        </Alert>
    );
};
