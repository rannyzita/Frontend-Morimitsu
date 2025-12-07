import { X } from 'lucide-react'
import { type FC } from 'react'

import { InputField } from './components/input';
import { ActionButton } from './components/actionButton';
import IconTeacher from './assets/Professor.svg';
import { Users, SquarePen } from 'lucide-react';
import { useState } from 'react';

interface classModalProps {
    isOpen: boolean
    onClose: () => void
    classInfo: {
        id: number
        name: string
        responsavel: string
        avatar: string
        ageMax: number
        ageMin: number
        quantityStudents: number
    } | null
}

export const ClassModal: FC<classModalProps> = ({ isOpen, onClose, classInfo }) => {
    if (!isOpen || !classInfo) return null

    const [promoverProfessor, setPromoverProfessor] = useState(false);

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>

            {/* Fundo escuro */}
            <div
                onClick={onClose}
                className='absolute inset-0 bg-black/40 backdrop-blur-[4px] '
            />

            {/* Modal */}0
            <div className='relative w-[96%] max-w-[1000px] bg-white rounded-xl shadow-2xl px-4 py-4 sm:px-8 sm:py-6
            transform transition-all duration-300 ease-out
            opacity-0 scale-95 animate-modal'>

                {/* Cabeçalho */}
                <div className='relative flex justify-center items-center mb-2'>
                    <h2 className='text-[#690808] font-extrabold text-xl md:text-3xl lg:text-4xl'>
                        DADOS DA TURMA
                    </h2>

                    <button onClick={onClose} className='absolute right-0 cursor-pointer'>
                        <X size={20} strokeWidth={3} className='text-[#690808] sm:size-10'/>
                    </button>
                </div>

                <div className='border-b-5 border-[#690808] mb-6' />

                {/* TOPO: Ações + Avatar + Histórico */}
                <div className='flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-10 mb-8'>

                    <div className='flex flex-col gap-4'>
                        <ActionButton
                                leftIcon={<Users size={30} />}
                                title='EDITAR TURMA'
                                rightIcon={<SquarePen size={30} />}
                                onClick={() => console.log('EDITAR clicado')}
                            />
                    </div>

                    {/* PERFIL */}
                    <div className='flex flex-col items-center text-center gap-2'>

                        <img
                            src={classInfo.avatar}
                            className='w-[150px] h-[150px] rounded-full'
                        />

                        <h3 className='pt-2 text-lg text-black underline'>
                            {classInfo.name}
                        </h3>
                    </div>

                    <div></div>
                </div>
                
                <div className='border-b-5 border-[#690808] mb-6' />

                <h4 className='text-center text-[#690808] font-extrabold mb-2 text-2xl'>
                        INFORMAÇÕES DA TURMA
                </h4>

                {/* FORMULÁRIO */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-black mb-8 p-6 px-30'>
                    
                    <InputField 
                        label='Responsável:' 
                        value='Saulo Bezerra' 
                        hasInfoIcon
                    />
                    
                    <InputField 
                        label='Alunos Totais' 
                        value='93' 
                    />
                    
                    <InputField 
                        label='Idade Mínima:' 
                        value='X' 
                        hasInfoIcon
                    />

                    <InputField 
                        label='Idade Máxima:' 
                        value='Y' 
                        hasInfoIcon
                    />
                    
                </div>
                </div>
            </div>
    )
}
