import { X } from 'lucide-react'
import { type FC } from 'react'

import { InputField } from './components/input'
import { ActionButton } from './components/actionButton'
import { Users, SquarePen } from 'lucide-react'

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

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>

            {/* Fundo escuro */}
            <div
                onClick={onClose}
                className='absolute inset-0 bg-black/40 backdrop-blur-[4px]'
            />

            {/* Modal */}
            <div
                className='
                    relative
                    w-[96%]
                    max-w-[1000px]
                    bg-white
                    rounded-xl
                    shadow-2xl
                    px-3 py-3
                    sm:px-8 sm:py-6
                    transform transition-all duration-300 ease-out
                    opacity-0 scale-95 animate-modal
                '
            >

                {/* Cabeçalho */}
                <div className='relative flex justify-center items-center mb-2 mt-2'>
                    <h2
                        className='
                            text-[#690808]
                            font-extrabold
                            text-[20px] md:text-3xl lg:text-4xl
                        '
                    >
                        DADOS DA TURMA
                    </h2>

                    <button
                        onClick={onClose}
                        className='absolute right-0 cursor-pointer'
                    >
                        <X
                            size={30}
                            strokeWidth={3}
                            className='text-[#690808] md:size-8 lg:size-10'
                        />
                    </button>
                </div>

                <div className='border-b-5 border-[#690808] mb-4 md:mb-6' />

                {/* TOPO: Ações + Avatar */}
                <div
                    className='
                        flex-col
                        grid grid-cols-3
                        md:grid md:grid-cols-3 md:gap-8
                        lg:grid lg:grid-cols-3 lg:gap-10
                        mb-6    
                    '
                >

                    {/* Botão */}
                    <div className='flex flex-col gap-4'>
                        <ActionButton
                            leftIcon={<Users className='size-4 md:size-10' />}
                            title='EDITAR TURMA'
                            rightIcon={<SquarePen className='size-4 md:size-10' />}
                            onClick={() => console.log('EDITAR clicado')}
                        />
                    </div>

                    {/* PERFIL */}
                    <div className='flex flex-col items-center text-center gap-2'>
                        <img
                            src={classInfo.avatar}
                            className='
                                w-[60px] h-[60px]
                                md:w-[130px] md:h-[130px]
                                lg:w-[150px] lg:h-[150px]
                                rounded-full
                            '
                        />

                        <h3
                            className='
                                pt-2
                                text-[14px]
                                md:text-base
                                lg:text-lg
                                text-black
                                underline
                            '
                        >
                            {classInfo.name}
                        </h3>
                    </div>

                    <div />
                </div>

                <h4
                    className='
                        text-center
                        text-[#690808]
                        font-extrabold
                        mb-2
                        text-[16px]
                        md:text-xl
                        lg:text-2xl
                    '
                >
                    INFORMAÇÕES DA TURMA:
                </h4>

                <div className='border-b-5 border-[#690808] mb-4 md:mb-8' />

                {/* FORMULÁRIO */}
                <div
                    className='
                        grid
                        grid-cols-2
                        gap-x-6
                        gap-y-3
                        text-black
                        mb-6
                        p-4
                        md:p-6
                    '
                >
                    <InputField
                        label='Responsável:'
                        value={classInfo.responsavel}
                        hasInfoIcon
                    />

                    <InputField
                        label='Alunos Totais'
                        value={String(classInfo.quantityStudents)}
                    />

                    <InputField
                        label='Idade Mínima:'
                        value={String(classInfo.ageMin)}
                        hasInfoIcon
                    />

                    <InputField
                        label='Idade Máxima:'
                        value={String(classInfo.ageMax)}
                        hasInfoIcon
                    />
                </div>
            </div>
        </div>
    )
}
