import type { FC } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Ícones
import { Eye, EyeOff, UserRound } from "lucide-react";

export const Login: FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black text-gray-400">
        {/* Container principal */}
            <div className="flex flex-row w-full max-w-7xl h-[600px] items-center justify-center bg-black">
                
                {/* Lado esquerdo com o logo */}
                <div className="flex-1 flex justify-center items-center h-full">
                    <img src="/MorimitsuLogo.jpeg" alt="Logo Morimitsu Jiu Jitsu" className="w-[550px] h-[550px] object-contain" />
                </div>

                {/* Lado direito com o formulário */}
                <div className="flex-1 flex justify-center items-center h-full p-8 md:p-12">
                    <div className="w-full max-w-sm h-full flex flex-col">
                        
                        {/* Título "SIGN IN" */}
                        <div className="mb-10 border-b-3 border-[#690808] pb-1  self-center -translate-y-6">
                            <h1 className="text-[#ffffff]  text-5xl font-normal tracking-wide">SIGN IN</h1>
                        </div>

                        {/* <<< MUDANÇA ESTRUTURAL AQUI >>>
                            Formulário agora é o container flex principal da coluna da direita */}
                        <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
                        
                        {/* <<< NOVO GRUPO PARA OS CAMPOS >>> */}
                            <div className="space-y-12">
                                {/* Campo Usuário */}
                                <div className="relative">
                                    <label htmlFor="username" className="text-[#757575] text-lg mb-2 block">Usuário:</label>
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

                                {/* Campo Senha */}
                                <div className="relative">
                                    <label htmlFor="password" className="text-[#757575] text-lg mb-2 block">Senha:</label>
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
                                
                                {/* Esqueceu a senha */}
                                <div className="flex justify-start text-sm -mt-6"> {/* Exemplo: Puxa o texto para mais perto do campo de senha */}
                                    <Link to="/recuperar-senha" className="text-[#757575] font-normal hover:underline">
                                        Esqueceu a senha?
                                    </Link>
                                </div>
                            </div>

                        {/* <<< DIV DE ESPAÇAMENTO AQUI >>>
                            Este div invisível cresce para ocupar todo o espaço vertical disponível,
                            empurrando o botão para a parte inferior. */}
                            <div className="flex-grow"></div>

                        {/* Botão de login agora no final */}
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#690808] text-white font-semibold rounded-md hover:bg-red-800 transition-colors text-lg"
                            >
                                Entrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};