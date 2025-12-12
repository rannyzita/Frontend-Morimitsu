import { type FC } from 'react';
import { Box, Button, TextField, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AlertMessage } from '../../components/FeedbackPassword/Feedback';

interface StepEmailProps {
    email: string;
    setEmail: (value: string) => void;

    loading: boolean;
    error: string | null;
    successMessage: string | null;

    emailError: boolean;
    showFirstStepMessage: boolean;

    handleSubmitEmail: () => void;
    handleContinueCode: () => void;
}

export const StepEmail: FC<StepEmailProps> = ({
    email,
    setEmail,
    loading,
    error,
    successMessage,
    emailError,
    showFirstStepMessage,
    handleSubmitEmail,
    handleContinueCode,
}) => {
    return (
        <Box
            component='form'
            onSubmit={(e) => e.preventDefault()}
            className='flex-grow flex flex-col justify-between relative pb-4'
        >
            <div className='my-6 self-center'>
                <h1 className='text-white text-[22px] md:text-3xl lg:text-5xl font-normal tracking-wide sm:whitespace-nowrap border-b-2 border-[#690808] pb-2 text-center'>
                    RECUPERAR SENHA
                </h1>
            </div>

            <div className='space-y-6 flex-grow min-h-[390px] md:min-h-[420px]'>
                <p className='text-center text-white leading-relaxed text-[13px] md:text-base'>
                    Para iniciar a recuperação, digite seu e-mail de cadastro para que possamos enviar o código de 5
                    dígitos. Lembre-se de verificar sua caixa de spam caso não receba a mensagem em alguns minutos.
                </p>

                {/* Campo de e-mail */}
                <div className='my-8'>
                    <label
                        htmlFor='email'
                        className='text-[#9E9E9E] text-base text-[14px] md:text-lg mb-2 block'
                    >
                        E-mail:
                    </label>

                    <TextField
                        required
                        fullWidth
                        id='email'
                        variant='outlined'
                        type='text'
                        placeholder='Digite seu e-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            sx: {
                                height: { xs: 42, md: 56 },
                                fontSize: { xs: '0.80rem', md: '1rem' },
                                '& input': {
                                    padding: { xs: '8px 10px', md: '14px 16px' },
                                    color: '#FFFFFF',
                                },
                            },
                        }}
                        inputProps={{
                            style: { fontSize: 'inherit' },
                        }}
                        sx={{
                            '& .MuiInputBase-input::placeholder': {
                                color: '#757575',
                                fontSize: '0.78rem',
                                '@media (min-width:768px)': {
                                    fontSize: '1rem',
                                },
                            },
                            '& .MuiOutlinedInput-root': {
                                '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active': {
                                    transition: 'background-color 5000s ease-in-out 0s',
                                    boxShadow: '0 0 0 30px #000000 inset !important',
                                    WebkitTextFillColor: '#FFFFFF !important',
                                },
                            },
                        }}
                        className='[&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]'
                    />
                </div>

                {/* Botão + mensagens */}
                <div className='relative flex flex-col w-full'>
                    <Button
                        onClick={handleSubmitEmail}
                        type='button'
                        variant='contained'
                        className='
                            !w-full !py-[12px] md:!py-[12px]
                            !bg-[#690808] !text-white 
                            !rounded-[16px]
                            hover:!bg-red-800
                            !text-[14px] md:!text-lg
                            !normal-case 
                            relative flex justify-center items-center
                        '
                        disabled={loading}
                    >
                        <span className={loading ? 'invisible' : ''}>Enviar Código</span>

                        {loading && <CircularProgress size={22} color='inherit' className='absolute' />}
                    </Button>

                    <div className='flex !justify-end min-h-[63px]'> <div className='max-w-[500px] w-fit'> {(error || successMessage || emailError || showFirstStepMessage) && ( <AlertMessage error={ error || (emailError ? 'Insira um e-mail!' : null) || (showFirstStepMessage ? 'Envie o código primeiro!' : null) } successMessage={successMessage} /> )} </div> </div>
                </div>
            </div>

            {/* Rodapé: Sem margem superior fixa, é posicionado pelo justify-between */}
            <div className='flex items-center justify-between'>
                <Button
                    component={RouterLink}
                    to='/login'
                    className='
                        !text-white !font-normal 
                        hover:!underline 
                        !bg-transparent 
                        !normal-case
                    '
                >
                    Voltar
                </Button>

                <Button
                    onClick={handleContinueCode}
                    type='button'
                    variant='contained'
                    className='
                        !px-12 !py-2 md:!py-3 
                        !bg-[#690808] !text-white 
                        !rounded-[10px] 
                        hover:!bg-red-800 
                        !normal-case 
                        relative flex justify-center items-center
                    '
                    disabled={loading}
                >
                    Continuar
                </Button>
            </div>
        </Box>
    );
};