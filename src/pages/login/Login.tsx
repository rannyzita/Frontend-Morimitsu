import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

//icones 
import { Eye, EyeOff } from "lucide-react";

export const Login: FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);
    
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // lógica de autenticação futura
        navigate("/dashboard");
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-logo">
                    <img src="/Icone-Morimitsu-2.png" alt="Logo Jiu-Jitsu" />
                </div>

                <h1 className="login-title">Morimitsu Jiu Jitsu - Cedro</h1>

                <form onSubmit={handleSubmit} className="login-form">

                <div className="login-field">
                    <label className="login-label">Usuário</label>
                    <input type="text" className="login-input" required />
                </div>

                <div className="login-field relative">
                    <label className="login-label">Senha</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="login-input pr-10" // pr-10 para espaço para o ícone
                        required
                    />
                    <span
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        onClick={togglePassword}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                </div>
                
                <button type="submit" className="login-button">Entrar</button>
                </form>
            </div>
        </div>
    );
};
