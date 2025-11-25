import { X } from 'lucide-react';
import { type FC } from 'react';

interface StudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: {
        id: number;
        name: string;
        avatar: string;
        role: string;
    } | null;
}

export const UserModal: FC<StudentModalProps> = ({ isOpen, onClose, student }) => {
    if (!isOpen || !student) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>

        {/* Fundo escuro */}
        <div
            className='absolute inset-0 bg-black/40 backdrop-blur-[4px]'
            onClick={onClose}
        />

        {/* Modal */}
        <div className='relative w-[95%] max-w-[750px] bg-[#ffffff] rounded-xl shadow-xl'>

            {/* Cabeçalho */}
            <div className='flex justify-between items-center px-6 py-3 rounded-t-xl'>
                <h2 className='text-[#690808] font-bold md:text-2xl lg:text-3xl'>
                    DADOS DO ALUNO
                </h2>

                <button onClick={onClose} className='cursor-pointer'>
                    <X size={30} className='text-[#690808] hover:scale-110 duration-150' />
                </button>
            </div>

            {/* Conteúdo */}
            <div className='bg-white m-4 rounded-xl p-5'>

                {/* Parte de cima */}
                <div className='flex items-center gap-5 mb-6'>

                    <img
                        src={student.avatar}
                        alt={student.name}
                        className='w-20 h-20 rounded-full object-cover border-2 border-[#690808]'
                    />

                    <div>
                        
                    <h3 className='text-xl font-bold text-[#690808]'>
                        {student.name}
                    </h3>

                    <p className='text-sm text-gray-600'>
                        Cargo atual: <strong>{student.role}</strong>
                    </p>

                    <p className='text-xs text-gray-500 mt-1'>
                        Aulas Totais: 30/30
                    </p>
                </div>
            </div>

            {/* Informações principais */}
            <h4 className='text-[#690808] font-bold mb-2'>
                Informações do aluno(a)
            </h4>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-sm'>

                <div>
                    <span className='font-semibold'>Nome completo:</span>
                    <p>{student.name}</p>
                </div>

                <div>
                    <span className='font-semibold'>CPF:</span>
                    <p>XXX.XXX.XXX-XX</p>
                </div>

                <div>
                    <span className='font-semibold'>Data de nascimento:</span>
                    <p>18/01/1980</p>
                </div>

                <div>
                    <span className='font-semibold'>Gênero:</span>
                    <p>Feminino</p>
                </div>

                <div>
                    <span className='font-semibold'>Turma:</span>
                    <p>Mista</p>
                </div>

                <div>
                    <span className='font-semibold'>Telefone:</span>
                    <p>(88) 9xxxx-xxxx</p>
                </div>

                <div className='md:col-span-2'>
                    <span className='font-semibold'>Endereço:</span>
                    <p>Rua Djuci Dias, 153 - Prado</p>
                </div>

            </div>

            {/* Histórico (lado direito do seu print) */}
            <div className='mt-6'>

                <h4 className='font-bold text-[#690808] mb-2'>
                    Histórico de promoções
                </h4>

                <div className='bg-gray-100 p-3 rounded-lg text-sm max-h-32 overflow-y-auto'>

                <p>✔ 01/12/2023 – Faixa Branca → Cinza</p>
                <p>✔ 08/04/2024 – Faixa Cinza → Amarela</p>
                <p>✔ 14/09/2024 – Faixa Amarela → Verde</p>
                <p>✔ 22/01/2025 – Faixa Verde → Azul</p>

                </div>
            </div>

            </div>
            </div>
        </div>
    );
};
