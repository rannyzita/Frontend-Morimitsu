import { type FC, useState } from 'react';
import { FeedbackToast } from '../Feedback/Feedback'; 
import { Eye, EyeOff } from 'lucide-react';

interface PromoveStudentAlertProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (user: string, pass: string) => void;
}

export const PromoveStudent: FC<PromoveStudentAlertProps> = ({
    isOpen,
    onClose,
    onConfirm
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!username || !password) {
            setToast({ message: 'Preencha todos os campos.', type: 'error' });
            return;
        }

        onConfirm(username, password);

        setToast({ message: 'Usuário promovido com sucesso!', type: 'success' });

        setUsername('');
        setPassword('');
        onClose();
    };

    return (
        <>
            {/* FUNDO ESCURECIDO */}
            <div className='fixed inset-0 bg-black/40 backdrop-blur-[4px] flex items-center justify-center z-50'>
                {/* CARD */}
                <div className='bg-white text-black rounded-xl shadow-lg p-6 w-full max-w-xs sm:max-w-md mx-4 transform transition-all duration-300 ease-out
            opacity-0 scale-95 animate-modal'>
                    <h2 className='text-xl font-bold mb-2 text-center sm:text-2xl'>
                        Promover para Professor(a)
                    </h2>

                    <div className='border-b-5 border-[#690808] mb-6' />

                    <p className='mb-4'><span className='font-bold'>Insira no usuário:</span> e-mail ou cpf</p>
                    <p className='leading-relaxed text-[13px] md:text-base mb-4'>
                        <span className='font-bold'>A senha precisa ter:</span><br />
                        • No mínimo 8 caracteres<br />
                        • Pelo menos uma letra maiúscula (A-Z)<br />
                        • Pelo menos um número (0-9)
                    </p>

                    {/* INPUTS */}
                    <div className='flex flex-col gap-4 mb-8'>
                        <input
                            type='text'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder='Usuário'
                            className='w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#690808]'
                        />

                        {/* INPUT SENHA COM OLHINHO */}
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder='Senha'
                                className='w-full border border-gray-300 rounded-lg py-2 px-3 pr-10 text-sm focus:outline-none focus:border-[#690808]'
                            />

                            <button                                                             
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-[#757575]'
                            >
                                {showPassword ? (
                                    <Eye size={20} className='text-[#757575]' />
                                ) : (
                                    <EyeOff size={20} className='text-[#757575]' />
                                )}
                            </button>
                        </div>
                    </div>
                    
                    <p className='leading-relaxed text-[13px] md:text-[14px] mb-6 text-justify'>
                        Ao concluir esta ação, o(a) aluno(a) será promovido ao cargo de professor. Lembre-se de entregar ao usuário as credenciais de acesso necessárias para que ele possa entrar no sistema.
                    </p>

                    {/* BOTÕES */}
                    <div className='flex flex-row gap-8 sm:flex-row sm:justify-center sm:gap-8'>
                        <button
                            onClick={onClose}
                            className='bg-neutral-800 text-white font-semibold py-3 w-full rounded-lg hover:bg-neutral-700 transition-colors'
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleSubmit}
                            className='bg-[#690808] text-white font-semibold py-3 w-full rounded-lg hover:bg-red-800 transition-colors'
                        >
                            Promover
                        </button>
                    </div>
                </div>
            </div>

            {/* TOAST POR CIMA DE TUDO */}
            {toast && (
                <FeedbackToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
};
