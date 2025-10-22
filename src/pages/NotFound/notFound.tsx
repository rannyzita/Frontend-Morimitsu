import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Swords } from 'lucide-react'; // Importando o novo ícone de "Luta"

export const NotFound: FC = () => {
    return (
        // Contêiner principal, ocupando 100% da tela
        <div className='flex flex-col items-center justify-center 
                        min-h-screen                     
                        bg-neutral-950                   
                        text-white px-4 py-8'>          

            {/* Ícone de Luta (Swords) grande e cinza */}
            <div className='mb-8 text-gray-400'>
                <Swords size={120} strokeWidth={1.5} className='text-gray-400' />
            </div>

            {/* Título de Erro (6xl no mobile, 8xl no desktop) */}
            {/* Garantido o text-center no mobile para evitar desalinhamento */}
            <h1 className='text-6xl md:text-8xl font-bold text-gray-200 mb-4 text-center'>
                404 Not Found!
            </h1>

            {/* Mensagem Temática (xl no mobile, 2xl no desktop) */}
            {/* Garantido o text-center no mobile para evitar desalinhamento */}
            <p className='text-xl md:text-2xl text-gray-400 mb-8 text-center max-w-md'>
                O tatame que você procura parece não estar aqui. 
                Talvez um novo caminho seja o ideal.
            </p>

            {/* Botão de Retorno */}
            <Link 
                to='/home' 
                className='bg-[#690808] text-white font-semibold py-3 px-8 rounded-lg 
                            hover:bg-red-800 transition-colors shadow-[0_5px_15px_rgba(0,0,0,0.3)]
                            text-lg'
            >
                Voltar ao Dojô
            </Link>
        </div>
    );
};