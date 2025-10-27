import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Swords } from 'lucide-react'; 

export const NotFound: FC = () => {
    return (
        <div className='fixed inset-0 
                        flex flex-col items-center justify-center 
                        bg-neutral-950                   
                        text-white px-4 py-8
                        overflow-hidden'> {/* Garante que nada dentro force a rolagem */}

            <div className='mb-8 text-gray-400'>
                <Swords size={120} strokeWidth={1.5} className='text-gray-400' />
            </div>

            <h1 className='text-6xl md:text-8xl font-bold text-gray-200 mb-4 text-center'>
                404 Not Found!
            </h1>

            <p className='text-xl md:text-2xl text-gray-400 mb-8 text-center max-w-md'>
                O tatame que você procura parece não estar aqui. 
                Talvez um novo caminho seja o ideal.
            </p>

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
