import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const SideBar: React.FC = () => {

    const { user } = useAuth();

    return (
        <aside className="bg-gray-900 text-white w-64 p-4">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <nav>
                <ul>
                    <li className="mb-2"><a href="#" className="hover:text-red-500">Home</a></li>
                    <li className="mb-2"><a href="#" className="hover:text-red-500">Turmas</a></li>
                    
                    {/* Exemplo de item de menu que só o coordenador vê */}
                    {user?.role === 'coordenador' && (
                        <li className="mb-2 bg-red-800 p-2 rounded">
                            <a href="#" className="hover:text-yellow-300">Painel do Coordenador</a>
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    )
}