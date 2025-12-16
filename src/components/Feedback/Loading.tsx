import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSectionProps {
    height?: string | number;
    message?: string;
}

export const LoadingSection = ({
    height = 200,
    message = 'Carregando...'
}: LoadingSectionProps) => {
    return (
        <Box
            sx={{
                height,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
            }}
        >
            <CircularProgress color='inherit' />
            <Typography
                sx={{ color: '#fff', fontSize: 14 }}
                className='!font-bold'
            >
                {message}
            </Typography>
        </Box>
    );
};
