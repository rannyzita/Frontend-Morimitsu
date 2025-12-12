import { Box, Button, TextField, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';

interface StepResetProps {
    newPassword: string;
    setNewPassword: (value: string) => void;
    confirmPassword: string;
    setConfirmPassword: (value: string) => void;
    loading: boolean;
    setStep: (value: string) => void;
    handleResetPassword: () => void;
    showPassword: boolean;
    togglePassword: () => void;
    showPasswordConfirmer: boolean;
    togglePasswordConfirmer: () => void;
}

export function StepReset({
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    setStep,
    handleResetPassword,
    showPassword,
    togglePassword,
    showPasswordConfirmer,
    togglePasswordConfirmer
}: StepResetProps) {
    return (
        <Box
            component='form'
            onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}
            className='flex-grow flex flex-col justify-between relative pb-4'
        >
            <div className='my-6 self-center'>
                <h1 className='text-white text-[22px] md:text-3xl lg:text-5xl font-normal tracking-wide whitespace-nowrap border-b-2 border-[#690808] pb-2 text-center'>
                    ATUALIZAR SENHA
                </h1>
            </div>

            <div className='space-y-6 flex-grow min-h-[390px] md:min-h-[420px]'>
                <p className='text-white leading-relaxed text-[13px] md:text-base'>
                    Sua nova senha precisa ter:<br />
                    • No mínimo 8 caracteres<br />
                    • Pelo menos uma letra maiúscula (A-Z)<br />
                    • Pelo menos um número (0-9)
                </p>

                <div>
                    <label htmlFor='password' className='text-[#9E9E9E] text-base text-[14px] md:text-lg mb-2 block'>Insira a nova senha:</label>
                    <TextField
                        required
                        fullWidth
                        id='password'
                        variant='outlined'
                        placeholder='Digite sua nova senha'
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        InputProps={{
                            sx: {
                                height: { xs: 42, md: 56 },
                                fontSize: { xs: '0.80rem', md: '1rem' },
                                '& input': {
                                    padding: { xs: '8px 10px', md: '14px 16px' },
                                },
                            },
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton onClick={togglePassword} edge='end' className='!text-[#9E9E9E]'>
                                        {showPassword ? (
                                            <Eye className='w-5 h-5 sm:w-6 sm:h-6' />
                                        ) : (
                                            <EyeOff className='w-5 h-5 sm:w-6 sm:h-6' />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{
                            style: {
                                fontSize: 'inherit',
                            },
                        }}
                        sx={{
                            '& .MuiInputBase-input::placeholder': {
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
                        className='[&_input]:!text-white [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]'
                    />
                </div>

                <div>
                    <label htmlFor='passwordConfirmer' className='text-[#9E9E9E] text-base  text-[14px] md:text-lg mb-2 block'>
                        Confirme a senha:
                    </label>

                    <TextField
                        required
                        fullWidth
                        id='passwordConfirmer'
                        variant='outlined'
                        placeholder='Confirme sua nova senha'
                        type={showPasswordConfirmer ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            sx: {
                                height: { xs: 42, md: 56 },
                                fontSize: { xs: '0.80rem', md: '1rem' },
                                '& input': {
                                    padding: { xs: '8px 10px', md: '14px 16px' },
                                },
                            },
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton onClick={togglePasswordConfirmer} edge='end' className='!text-[#9E9E9E]'>
                                        {showPasswordConfirmer ? (
                                            <Eye className='w-5 h-5 sm:w-6 sm:h-6' />
                                        ) : (
                                            <EyeOff className='w-5 h-5 sm:w-6 sm:h-6' />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{
                            style: {
                                fontSize: 'inherit',
                            },
                        }}
                        sx={{
                            '& .MuiInputBase-input::placeholder': {
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
                        className='[&_input]:!text-white [&_.MuiOutlinedInput-root]:!rounded-2xl [&_.MuiOutlinedInput-notchedOutline]:!border-[1.95px] [&_.MuiOutlinedInput-notchedOutline]:!border-[#757575]'
                    />
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <Button
                    onClick={() => setStep('code')}
                    className='!text-white !font-normal hover:!underline !bg-transparent !normal-case'
                >
                    Voltar
                </Button>

                <Button
                    type='submit'
                    variant='contained'
                    className='!px-12 !py-2 md:!py-3 !bg-[#690808] !text-white !rounded-[10px] hover:!bg-red-800 !normal-case relative flex justify-center items-center'
                    disabled={loading || !newPassword || newPassword !== confirmPassword}
                >
                    <span className={loading ? 'invisible' : ''}>Confirmar</span>

                    {loading && (
                        <CircularProgress size={24} color='inherit' className='absolute' />
                    )}
                </Button>
            </div>
        </Box>
    );
}