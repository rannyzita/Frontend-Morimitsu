import { X, User, SquarePen, GraduationCap } from 'lucide-react'
import { type FC } from 'react'

import IconPromotePTeacher from './assets/IconePromoteTeacher.svg'; 
import FaixaRoxaSVG from './assets/faixa-roxa.svg'; 

interface StudentData {
    id: number
    name: string
    avatar: string
    role: string
    age: number 
    team: string
}

interface EvaluationModalProps {
    isOpen: boolean
    onClose: () => void
    student: StudentData | null
    
    currentGrade: string
    nextGrade: string
    nextGraduationDate: string
}

const BeltDisplay: FC<{ beltName: string, svgSrc: string }> = ({ beltName, svgSrc }) => (
    <div className='flex flex-col items-center gap-2'>
        <span className='font-bold text-lg text-black'>{beltName}</span>
        <img src={svgSrc} alt={`${beltName} Belt`} className='w-20 h-auto' />
    </div>
);


export const EvaluationModal: FC<EvaluationModalProps> = ({ 
    isOpen, 
    onClose, 
    student,
    currentGrade,
    nextGrade,
    nextGraduationDate
}) => {
    if (!isOpen || !student) return null

    // Dados Fictícios de Avaliação (para preencher o layout)
    const currentBeltName = 'ROXA';
    const nextBeltName = 'ROXA'; 

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            
            {/* Fundo escuro */}
            <div
                onClick={onClose}
                className='absolute inset-0 bg-black/40 backdrop-blur-[4px] '
            />

            {/* Modal - Ajustado para mobile first e centralizado no desktop */}
            <div className='relative w-[96%] max-w-[800px] bg-white rounded-xl shadow-2xl px-4 py-4 sm:px-8 sm:py-6 overflow-y-auto max-h-[90vh]'>

                {/* Cabeçalho de Avaliação */}
                <div className='relative flex justify-center items-center mb-4'>
                    <h2 className='text-[#690808] font-extrabold text-2xl md:text-3xl lg:text-4xl'>
                        AVALIAÇÃO
                    </h2>
                    <button onClick={onClose} className='absolute right-0 cursor-pointer'>
                        <X size={32} strokeWidth={3} className='text-[#690808]'/>
                    </button>
                </div>

                <div className='border-b-2 border-[#690808] mb-6' />

                {/* 1. SEÇÃO TOPO (Ações + Perfil) */}
                <div className='flex flex-col sm:flex-row gap-6 mb-8'>
                    
                    {/* Botões de Ação (Ações) - LADO ESQUERDO */}
                    <div className='flex flex-col gap-3 w-full sm:w-1/3'>
                        {/* PROMOVER P/ PROFESSOR(A) */}
                        <button className='bg-[#690808] hover:opacity-90 text-white rounded-lg p-3 flex items-center gap-2 text-[12px] font-extrabold justify-center cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
                            <img src={IconPromotePTeacher} alt='Promover Professor' className='w-8 h-8' />
                            PROMOVER P/ PROFESSOR(A)
                            <input type='checkbox' className='appearance-none w-5 h-5 border-2 border-white rounded-md bg-transparent checked:bg-white checked:border-white' />
                        </button>
                        
                        {/* EDITAR ALUNO(A) */}
                        <button className='bg-[#690808] hover:opacity-90 text-white rounded-lg p-3 flex items-center gap-2 justify-center text-[12px] font-extrabold cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
                            <User size={20}/>
                            EDITAR ALUNO(A)
                            <SquarePen size={20}/>
                        </button>
                    </div>

                    {/* Perfil do Aluno - LADO DIREITO */}
                    <div className='flex flex-col items-center text-center w-full sm:w-2/3'>
                        <img
                            src={student.avatar}
                            className='w-20 h-20 rounded-full'
                        />
                        <h3 className='font-bold text-xl text-black underline mt-2'>
                            {student.name} ({student.age} anos)
                        </h3>
                        <p className='text-sm text-black'>
                            Turma: <span className='font-semibold'>{student.team}</span> | Cargo: <span className='font-semibold'>{student.role}</span>
                        </p>
                    </div>
                </div>

                {/* 2. SEÇÃO PRINCIPAL (REQUISITOS & FAIXAS) */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    
                    {/* REQUISITOS & STATUS - LADO ESQUERDO */}
                    <div className='flex flex-col gap-3'>
                        <div className='bg-[#690808] text-white p-2 font-extrabold rounded-t-lg text-center'>REQUISITOS</div>
                        
                        {/* Lista de Requisitos */}
                        <ul className='text-black text-sm pl-4'>
                            <li className='mb-2'>• Aulas Mínimas: 170</li>
                            {/* Adicionar mais requisitos aqui */}
                        </ul>
                        
                        <div className='bg-[#690808] text-white p-2 font-extrabold text-center'>STATUS</div>
                        
                        <div className='bg-gray-200 p-3 flex flex-col gap-3 rounded-b-lg'>
                            {/* Aulas/Frequência */}
                            <div className='bg-[#690808] text-white p-2 font-extrabold rounded text-center'>
                                AULAS: 170
                            </div>

                            {/* Legenda do Status */}
                            <div className='flex justify-between text-xs mt-2'>
                                <span className='flex items-center gap-1'><span className='w-3 h-3 bg-green-500 rounded-full'></span> Concluído</span>
                                <span className='flex items-center gap-1'><span className='w-3 h-3 bg-orange-400 rounded-full'></span> Próximo</span>
                                <span className='flex items-center gap-1'><span className='w-3 h-3 bg-red-600 rounded-full'></span> Longe</span>
                            </div>
                        </div>
                    </div>

                    {/* FAIXA ATUAL & PRÓXIMA FAIXA - LADO DIREITO */}
                    <div className='bg-gray-200 rounded-lg'>
                        <div className='grid grid-cols-2 text-white font-extrabold text-center'>
                            <div className='bg-[#690808] p-2 rounded-tl-lg'>FAIXA ATUAL</div>
                            <div className='bg-[#690808] p-2 rounded-tr-lg'>PRÓXIMA FAIXA</div>
                        </div>

                        <div className='grid grid-cols-3 items-center justify-center p-4 bg-gray-200 text-black'>
                            {/* Faixa Atual */}
                            <div className='col-span-1 flex flex-col items-center'>
                                <BeltDisplay beltName={currentBeltName} svgSrc={FaixaRoxaSVG} />
                                <span className='font-semibold text-center mt-2'>GRAU ATUAL: {currentGrade}</span>
                            </div>

                            {/* Setas */}
                            <div className='col-span-1 flex justify-center text-[#690808] font-extrabold text-4xl'>
                                &raquo;
                            </div>

                            {/* Próxima Faixa */}
                            <div className='col-span-1 flex flex-col items-center'>
                                <BeltDisplay beltName={nextBeltName} svgSrc={FaixaRoxaSVG} />
                                <span className='font-semibold text-center mt-2'>PRÓXIMO GRAU: {nextGrade}</span>
                            </div>
                        </div>
                        
                        <div className='bg-[#690808] text-white p-1 text-center font-semibold rounded-b-lg'>
                            Graduará em: <span className='underline'>{nextGraduationDate}</span>
                        </div>
                    </div>
                </div>

                {/* 3. BOTÕES DE AÇÃO INFERIORES */}
                <div className='flex justify-center gap-8 mt-8'>
                    <button onClick={onClose} className='bg-gray-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-500 transition-colors'>
                        Cancelar
                    </button>
                    <button className='bg-[#690808] text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-800 transition-colors'>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}