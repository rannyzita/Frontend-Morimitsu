import { Box, Typography } from '@mui/material';
import { Skull, WifiOff } from 'lucide-react';

type FeedbackType = 'empty' | 'error';

interface EmptyFeedbackProps {
    type?: FeedbackType;
    message: string;
    height?: string | number;

    textSize?: {
        mobile?: string;
        tablet?: string;
        desktop?: string;
    };

    iconSize?: number;
}

export const EmptyFeedback = ({
    type = 'empty',
    message,
    height = 200,
    textSize = {
        mobile: '12px',
        tablet: '14px',
        desktop: '16px'
    },
    iconSize = 48
}: EmptyFeedbackProps) => {
    const Icon = type === 'error' ? WifiOff : Skull;

    return (
        <Box
            sx={{
                height,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                textAlign: 'center'
            }}
        >
            <Icon size={iconSize} color='#ffffff' />

            <Typography
                sx={{
                    color: '#ffffff',
                    fontSize: {
                        xs: textSize.mobile,
                        md: textSize.tablet,
                        lg: textSize.desktop
                    },
                }}
                className='!font-bold'
            >
                {message}
            </Typography>
        </Box>
    );
};
