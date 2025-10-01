import type { FC } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"; 
import { UserRound } from "lucide-react";

export const RecuperarSenha: FC = () => {
    // 1. Criamos um estado para controlar a etapa atual do fluxo
    const [step, setStep] = useState<'email' | 'code' | 'reset'>('email');
    const [email, setEmail] = useState('');

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // AQUI você faria a chamada para a sua API Flask, enviando o e-mail.
        console.log("Enviando e-mail para:", email);

        // Se a API retornar sucesso, você avança para a próxima etapa.
        // Por enquanto, vamos apenas simular isso:
        setStep('code'); 
    };
    
    // As funções para as outras etapas viriam aqui...

    return (
        <div className="flex justify-center items-center h-screen bg-black text-gray-400">
            {/* Container principal (idêntico ao de Login) */}
            <div className="flex flex-row w-full max-w-7xl h-[600px] items-center justify-center bg-black">
                
                {/* Lado esquerdo com o logo */}
                <div className="flex-1 flex justify-center items-center h-full">
                    <img src="/MorimitsuLogo.jpeg" alt="Logo Morimitsu Jiu Jitsu" className="w-[550px] h-[550px] object-contain" />
                </div>

                {/* Lado direito com o formulário dinâmico */}
                <div className="flex-1 flex justify-center items-center h-full p-8 md:p-12">
                    <div className="w-full max-w-sm h-full flex flex-col justify-center">

                        {/* ETAPA 1: PEDIR O E-MAIL */}
                        {step === 'email' && (
                            <form onSubmit={handleEmailSubmit} className="flex flex-col space-y-8">
                                
                                {/* Título */}
                                <div className="mb-4 border-b-2 border-red-800 pb-2 self-center">
                                    <h1 className="text-white text-6xl font-normal tracking-wide">RECUPERAR SENHA</h1>
                                </div>

                                {/* Texto descritivo */}
                                <p className="text-center text-white text-sm">
                                    Para iniciar a recuperação, digite seu e-mail de cadastro para que possamos enviar o código de 5 dígitos. Lembre-se de verificar sua caixa de spam caso não receba a mensagem em alguns minutos.
                                </p>
                                
                                {/* Campo E-mail */}
                                <div className="relative">
                                    <label htmlFor="username" className="text-[#757575] text-lg mb-2 block">E-mail:</label>
                                    <div className="relative flex items-center border-[1.95px] border-[#757575] rounded-2xl px-4 py-3 focus-within:border-[#690808]">
                                        <input
                                            id="username"
                                            type="text"
                                            className="w-full bg-transparent text-[#757575] focus:outline-none pr-8 text-lg"
                                            required
                                        />
                                        <UserRound className="absolute right-4 text-gray-500" size={22} />
                                    </div>
                                </div>
                                
                                {/* Botões de Ação */}
                                <div className="flex items-center justify-between">
                                    <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                                        Voltar
                                    </Link>
                                    <button
                                        type="submit"
                                        className="px-8 py-2 bg-red-800 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
                                    >
                                        Enviar E-mail
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* ETAPA 2: INSERIR O CÓDIGO (Exemplo de como seria) */}
                        {step === 'code' && (
                            <div>
                                <h1 className="text-white text-4xl text-center">CÓDIGO DE RECUPERAÇÃO</h1>
                                <p className="text-center mt-4">Enviamos um código para {email}.</p>
                                {/* Aqui viria o formulário do código... */}
                            </div>
                        )}

                        {/* ETAPA 3: NOVA SENHA (Exemplo) */}
                        {step === 'reset' && (
                            <div>
                                <h1 className="text-white text-4xl text-center">ATUALIZAR SENHA</h1>
                                {/* Aqui viria o formulário da nova senha... */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};