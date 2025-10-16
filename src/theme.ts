import { createTheme} from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#690808',
        },
        background: {
            default: '#000000',
            paper: '#1c1c1c',
        },
        text: {
            primary: '#ffffff',
            secondary: '#secundary',
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '16px', 
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#757575', 
                    borderWidth: '1.95px',
                },
                '   &:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#757575', 
                    },
                },
            },
        },
    }
})