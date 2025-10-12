import type { FC } from "react";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 

// Ícones
import { Mail, Eye, EyeOff } from "lucide-react";

type CodeInputProps = {
    value: string;
    index: number;
    onChange: (index: number, value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const RecuperarSenha: FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<'email' | 'code' | 'reset'>('email');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState<string[]>(Array(5).fill(''));

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [loadingResend, setLoadingResend] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmer, setShowPasswordConfirmer] = useState(false);

    useEffect(() => {
        const nextEmptyIndex = code.findIndex(digit => digit === '');

        if (nextEmptyIndex !== -1) {
            inputRefs.current[nextEmptyIndex]?.focus();
        }
    }, [code]); 

    function handleResendCode() {
        setLoadingResend(true);
        setTimeout(() => {
            setLoadingResend(false);
        }, 2000);
    }
    
    // 1. LÓGICA DE FOCO REMOVIDA DAQUI
    function handleCodeChange(index: number, value: string): void {
        // Permite apenas um dígito por campo
        const digit = value.slice(-1);

        if (/^[0-9]*$/.test(digit)) { // Opcional: Garante que apenas números sejam inseridos
            const updatedCode = [...code];
            updatedCode[index] = digit;
            setCode(updatedCode);
        }
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordConfirmer = () => {
        setShowPasswordConfirmer(!showPasswordConfirmer);
    };

    const CodeInput = React.forwardRef<HTMLInputElement, CodeInputProps>(
        ({ value, index, onChange, onKeyDown }, ref) => {
            return (
                <input
                    ref={ref}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => onChange(index, e.target.value)}
                    onKeyDown={onKeyDown}
                    id={`code-input-${index}`} 
                    className="w-12 h-14 text-3xl text-center border-[1.95px] border-[#757575] rounded-lg focus:outline-none focus:border-[#690808] transition-colors caret-[#690808] bg-white text-black" 
                    required
                />
            );
        }
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && code[index] === '' && index > 0) {
            e.preventDefault();
            const prevInput = inputRefs.current[index - 1];
            if (prevInput) {
                prevInput.focus();
                const newCode = [...code];
                newCode[index - 1] = '';
                setCode(newCode);
            }
        }
    };

    const handleContinueSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submetido, avançando para a próxima etapa...");
        if (step === 'email') {
            setStep('code'); 
        } else if (step === 'code') {
            setStep('reset');
        }
    };

    const handleSendEmailClick = () => {
        console.log("Enviando e-mail para:", email);
    };


    return (
        <div className="flex justify-center items-center h-screen bg-black text-gray-400">
            <div className="flex flex-row w-full max-w-7xl h-[600px] items-center justify-center bg-black">
                <div className="flex-1 flex justify-center items-center h-full">
                    <img src="/MorimitsuLogo.jpeg" alt="Logo Morimitsu Jiu Jitsu" className="w-[550px] h-[550px] object-contain" />
                </div>

                <div className="flex-1 flex justify-center items-center h-full p-8 md:p-12">
                    <div className="w-full max-w-sm h-full flex flex-col">

                        {/* ETAPA 1: PEDIR O E-MAIL */}
                        {step === 'email' && (
                            <form onSubmit={handleContinueSubmit} className="flex-grow flex flex-col">
                                
                                <div className="mb-2 self-center -translate-y-6">
                                    <h1 className="text-[#ffffff] text-6xl font-normal tracking-wide whitespace-nowrap border-b-2 border-[#690808] pb-2">RECUPERAR SENHA</h1>
                                </div>

                                <div className="space-y-6">
                                    <p className="text-center text-[#ffffff] leading-relaxed">
                                        Para iniciar a recuperação, digite seu e-mail de cadastro para que possamos enviar o código de 5 dígitos. Lembre-se de verificar sua caixa de spam caso não receba a mensagem em alguns minutos.
                                    </p>
                                    
                                    <div className="relative">
                                        <label htmlFor="email" className="text-[#757575] text-lg mb-2 block">E-mail:</label>
                                        <div className="relative flex items-center border-[1.95px] border-[#757575] rounded-2xl px-4 py-3 focus-within:border-[#690808]">
                                            <input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-transparent text-[#757575] focus:outline-none pr-8 text-lg"
                                                required
                                            />
                                            <Mail className="absolute right-4 text-[#757575]" size={22} />
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleSendEmailClick}
                                        className="w-full py-3 bg-[#690808] text-white rounded-[10px] hover:bg-red-800 transition-colors text-lg"
                                    >
                                        Enviar E-mail
                                    </button>
                                </div>

                                <div className="flex-grow"></div>
                                
                                <div className="flex items-center justify-between mt-8">
                                    <Link to="/login" className="text-[#ffffff] font-normal hover:underline pl-4">
                                        Voltar
                                    </Link>
                                    <button
                                        type="submit"
                                        className="px-12 py-3 bg-[#690808] text-white rounded-[10px] hover:bg-red-800 transition-colors"
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* ETAPA 2: INSERIR O CÓDIGO */}
                        {step === 'code' && (
                            <form onSubmit={handleContinueSubmit} className="flex-grow flex flex-col">
                                <div className="mb-4 self-center -translate-y-6">
                                    <h1 className="text-[#ffffff] text-6xl font-normal tracking-wide whitespace-nowrap border-b-3 border-[#690808] pb-2">CÓDIGO DE RECUPERAÇÃO</h1>
                                </div>

                                <div className="space-y-6">
                                    <p className="text-center text-[#ffffff] leading-relaxed">
                                        Agora, insira o código que enviamos para o seu e-mail exem***@gmail.com. Caso não tenha chegado, você pode reenviar o código abaixo.
                                    </p>

                                    <div className="flex justify-between space-x-2 my-8">
                                        {code.map((digit:string, index: number) => (
                                            <CodeInput 
                                                key={index}
                                                index={index}
                                                value={digit}
                                                onChange={handleCodeChange}
                                                ref={(el: HTMLInputElement | null) => { inputRefs.current[index] = el; }}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleResendCode}  
                                        disabled={loadingResend}
                                        className="w-full py-3 bg-[#690808] text-white rounded-[10px] hover:bg-red-800 transition-colors text-lg disabled:bg-red-900/50 disabled:cursor-not-allowed"
                                    >
                                        {loadingResend ? 'Enviando...' : 'Reenviar Código'}
                                    </button>
                                </div>

                                <div className="flex-grow"></div>
                                
                                <div className="flex items-center justify-between mt-8">
                                    <button
                                        type='button'
                                        onClick={()=> setStep('email')}
                                        className="text-[#ffffff] font-normal hover:underline pl-4 bg-transparent"
                                    >
                                        Voltar
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-12 py-3 bg-[#690808] text-white rounded-[10px] hover:bg-red-800 transition-colors"
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* ETAPA 3: NOVA SENHA */}
                        {step === 'reset' && (
                            <form className="flex-grow flex flex-col">
                                <div className="mb-4 self-center -translate-y-6">
                                    <h1 className="text-[#ffffff] text-6xl font-normal tracking-wide whitespace-nowrap border-b-2 border-[#690808] pb-2">ATUALIZAR SENHA</h1>
                                </div>

                                <div className="space-y-6 ">
                                    <p className="text center text-[#757575] leading relaxed">
                                    Sua nova senha precisa ter:<br></br>
                                    • No mínimo 8 caracteres<br></br>
                                    • Pelo menos uma letra maiúscula (A-Z)<br></br>
                                    • Pelo menos um número (0-9)
                                    </p>
                                </div>
                                
                                <div className="space-y-6 mt-4">
                                    <div className="relative">
                                        <label htmlFor="password" className="text-[#757575] text-lg mb-2 block">Insira a nova senha:</label>
                                        <div className="relative flex items-center border border-[#757575] rounded-2xl px-4 py-3 focus-within:border-[#690808]">
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                className="w-full bg-transparent text-[#757575] focus:outline-none pr-8 text-lg"
                                                required
                                            />
                                            <span onClick={togglePassword} className="absolute right-4 cursor-pointer text-[#757575]">
                                                {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label htmlFor="passwordConfirmer" className="text-[#757575] text-lg mb-2 block">Confirme a senha:</label>
                                        <div className="relative flex items-center border border-[#757575] rounded-2xl px-4 py-3 focus-within:border-[#690808]">
                                            <input
                                                id="passwordConfirmer"
                                                type={showPasswordConfirmer ? "text" : "password"}
                                                className="w-full bg-transparent text-[#757575] focus:outline-none pr-8 text-lg"
                                                required
                                            />
                                            <span onClick={togglePasswordConfirmer} className="absolute right-4 cursor-pointer text-[#757575]">
                                                {showPasswordConfirmer ? <Eye size={22} /> : <EyeOff size={22} />}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-grow"></div>

                                <div className="flex items-center justify-between mt-8">
                                    <button
                                        type='button'
                                        onClick={()=> setStep('code')}
                                        className="text-[#ffffff] font-normal hover:underline pl-4 bg-transparent"
                                    >
                                        Voltar
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-12 py-3 bg-[#690808] text-white rounded-[10px] hover:bg-red-800 transition-colors"
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};