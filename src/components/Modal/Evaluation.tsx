import { X, User, SquarePen, ChevronsRight } from 'lucide-react'
import { type FC, useState, } from 'react'
import { ActionButton } from './components/actionButton';
import IconTeacher from './assets/Professor.svg';
import FaixaRoxaSVG from './assets/FaixaRoxa.svg'; 
import { PromoveStudent } from '../PromoveStudent/PromoveStudent';
import { FeedbackToast } from '../Feedback/Feedback';

import { GraduationAlert } from '../GraduationAlert/GraduationAlert'; 

interface StudentData {
    id: number
    name: string
    nameSocial: string
    avatar: string
    role: string
    age: number 
    team: string 
    isCloseToGraduation: boolean
}

interface EvaluationModalProps {
    isOpen: boolean 
    onClose: () => void
    student: StudentData | null
    
    currentGrade: string
    nextGrade: string
    nextGraduationDate: string
}

export const EvaluationModal: FC<EvaluationModalProps> = ({ 
    isOpen, 
    onClose, 
    student,
    currentGrade,
    nextGrade,
    nextGraduationDate,
}) => {
    if (!isOpen || !student) return null

    const [isPromoteOpen, setPromoteOpen] = useState(false);

    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handlePromote = (user: string, pass: string) => {
        console.log('Promovendo com:', user, pass);
    };

    const isCloseToGraduation = student.isCloseToGraduation; 

    const DesktopTopSection = (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            
            {/* Botões de Ação (Ações) - LADO ESQUERDO */}
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
                    <ActionButton
                    leftIcon={
                        <img src={IconTeacher} alt='Professor' style={{ width: 50, height: 50 }} />
                    }
                    title={
                        <p className=''>
                            PROMOVER P/ PROFESSOR(A)
                        </p>
                    }
                    onClick={() => setPromoteOpen(true)}
                />

                    <ActionButton
                        leftIcon={<User size={30} />}
                        title='EDITAR ALUNO(A)'
                        rightIcon={<SquarePen size={30} />}
                        onClick={() => console.log('EDITAR clicado')}
                    />
                </div>
            </div>

            {/* Perfil - COLUNA CENTRAL */}
            <div className='flex flex-col items-center text-center'>
                <img
                    src={student.avatar}
                    className='w-25 h-25 rounded-full'
                />
                <h3 className='text-xl text-black underline mt-2'>
                    {student.nameSocial} ({student.age} anos)
                </h3>
                <p className='text-sm  text-black'>
                    <span className='font-bold'>Turma:</span> {student.team} mista | <span className='font-bold'>Cargo: </span> {student.role} estudante
                </p>
            </div>

            {/* Alerta de Graduação - COLUNA DIREITA */}
            <div className='flex justify-center md:justify-end md:items-start'>
                {isCloseToGraduation && (
                    <GraduationAlert message='Aluno(a) próximo da Graduação!' className='w-full md:w-auto'/>
                )}
            </div>
        </div>
    );

    // Componente TOPO: Ações, Perfil, Alerta (Mobile)
    const MobileTopSection = (
        <div className='flex flex-col gap-4'>
            {/* LINHA 1 (TOPO): Ações | Perfil | Alerta (Lado a Lado) */}
            <div className='flex justify-between items-start gap-2'>
                
                {/* AÇÕES - Lado Esquerdo */}
                <div className='flex flex-col gap-2 flex-1'>
                    <ActionButton
                        leftIcon={
                            <img src={IconTeacher} alt='Professor' style={{ width: 35, height: 25, }} />
                        }
                        title={
                            <p className='text-[8px]'>
                                PROMOVER P/ PROFESSOR(A)
                            </p>
                        }
                        onClick={() => setPromoteOpen(true)}
                    />
                    
                    <ActionButton
                        leftIcon={<User size={20} />} 
                        title='EDITAR ALUNO(A)'
                        rightIcon={<SquarePen size={20} />}
                    
                        onClick={() => console.log('EDITAR clicado')}
                    />
                </div>

                {/* PERFIL - Centro */}
                <div className='flex flex-col items-center text-center w-[30%]'>
                    <img
                        src={student.avatar}
                        className='w-14 h-14 rounded-full' 
                    />
                </div>

                {/* ALERTA - Lado Direito */}
                <div className='flex justify-end w-[35%]'>
                    {isCloseToGraduation && (
                        <GraduationAlert message='Aluno(a) próximo da Graduação!' className='w-full text-[9px] py-1'/>
                    )}
                </div>
            </div>
            
            {/* LINHA 2: Informações de Nome/Cargo (100% largura) */}
            <div className='flex flex-col items-center text-center mb-2'>
                <h3 className='text-base text-black underline mt-0'>
                    {student.nameSocial} ({student.age} anos)
                </h3>
                <p className='text-xs text-black'>
                    <span className='font-bold'>Turma:</span> {student.team} mista | <span className='font-bold'>Cargo: </span> {student.role} estudante
                </p>
            </div>
        </div>
    );

    // Componente de Requisitos/Status (Mobile)
    const MobileRequisitosSection = (
        // Adicionando max-w-sm para limitar a largura no celular
        <div className='flex flex-col w-full max-w-[280px] mx-auto'> 
            <div className='bg-[#690808] text-white p-2 font-extrabold rounded-t-lg text-center text-sm'>REQUISITOS</div>
            
            <div className='bg-[#D5D5D5] p-3 flex flex-col text-center'>
                <ul className='text-black text-xs pl-4 bg-[#D5D5D5'>
                    <li className='mb-2'>• Aulas Mínimas: 170</li>
                </ul>
            </div>
            
            <div className='flex bg-[#690808] text-white p-2 font-extrabold text-center justify-center text-sm'>
                <User size={16} className='inline-block mr-2' />
                <p>STATUS</p>
            </div>
            
            <div className='bg-[#D5D5D5] pr-14 pl-14 pt-4 pb-4 flex flex-col'>
                <div className='grid grid-cols-2 text-white font-extrabold text-center border-black border-t-2 border-l-2 border-r-2 text-[10px]'>
                    <div className='bg-[#690808] p-1 border-r border-black'>GRAU</div>
                    <div className='bg-[#690808] p-1'>AULAS</div>
                </div>
                <div className='grid grid-cols-2 font-extrabold text-center border-black border-2 text-[14px] text-black'>
                    <div className='bg-orange-500 p-1 border-r border-black'>4º</div>
                    <div className='bg-yellow-500 p-1'>119</div>
                </div>
            </div>

            <div className='flex justify-between text-[14px] mt-2 text-black'>
                <span className='flex items-center gap-1'><span className='w-4 h-4 bg-green-500 border-black border'></span> Concluído</span>
                <span className='flex items-center gap-1'><span className='w-4 h-4 bg-orange-400 border-black border'></span> Próximo</span>
                <span className='flex items-center gap-1'><span className='w-4 h-4 bg-red-600 border-black border'></span> Longe</span>
            </div>
        </div>
    );

    // Componente Faixa Atual / Próxima Faixa (Mobile)
    const MobileFaixaSection = (
        <div className='bg-[#D5D5D5] rounded-lg flex flex-col'>

            {/* Topo */}
            <div className='grid grid-cols-[1fr_2px_1fr] text-white font-extrabold text-center text-xs border-black border-b-3'>
                <div className='bg-[#690808] p-2 rounded-tl-lg'>FAIXA ATUAL</div>
                <div className='bg-[#D5D5D5]' />
                <div className='bg-[#690808] p-2 rounded-tr-lg'>PRÓXIMA FAIXA</div>
            </div>

            {/* Conteúdo com separação vertical */}
            <div className='grid grid-cols-3 items-center justify-center py-2 px-8 bg-[#D5D5D5] text-black'>
                <div className='flex flex-col items-center justify-center'>
                    <span className='text-[#690808] font-extrabold text-xs'>ROXA</span>
                    <img src={FaixaRoxaSVG} alt='Faixa roxa' className='w-16 h-16' />
                </div>
                <div className='flex flex-col items-center justify-center relative'>
                    <ChevronsRight size={32} className='text-[#690808] z-10' />
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <span className='text-[#690808] font-extrabold text-xs'>ROXA</span>
                    <img src={FaixaRoxaSVG} alt='Faixa roxa' className='w-16 h-16'/>
                </div>
            </div>

            {/* Rodapé */}
            <div className='grid grid-cols-[1fr_2px_1fr] text-white font-extrabold text-center text-[10px] mt-auto border-black border-t-3'>
                <div className='bg-[#690808] p-2 rounded-bl-lg'>Grau atual: {currentGrade}</div>
                <div className='bg-[#D5D5D5]'/>
                <div className='bg-[#690808] p-2 rounded-br-lg'>Próximo Grau: {nextGrade}</div>
            </div>
        </div>
    );

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            
            {toast && (
                <FeedbackToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            
            <div
                onClick={onClose}
                className='absolute inset-0 bg-black/40 backdrop-blur-[4px] '
            />

            <div className='relative w-[96%] max-w-[800px] bg-white rounded-xl shadow-2xl px-4 py-4 sm:px-8 sm:py-6 overflow-y-auto max-h-[110vh]
            transform transition-all duration-300 ease-out
            opacity-0 scale-95 animate-modal
            '>

                {/* Cabeçalho de Avaliação */}
                <div className='relative flex justify-center items-center md:mt-2 md:mb-2'>
                    <h2 className='text-[#690808] font-extrabold text-xl md:text-3xl lg:text-4xl'>
                        AVALIAÇÃO
                    </h2>
                    <button onClick={onClose} className='absolute right-0 mb-2 cursor-pointer'>
                        <X size={32} strokeWidth={3} className='text-[#690808]'/>
                    </button>
                </div>

                <div className='border-b-5 border-[#690808] mb-4' />

                {/* 1. SEÇÃO TOPO (Desktop/Tablet) */}
                <div className='hidden md:block'>
                    {DesktopTopSection}
                </div>
                
                {/* 1. SEÇÃO TOPO (Mobile) */}
                <div className='md:hidden'>
                    {MobileTopSection}
                </div>

                <div className='border-b-5 border-[#690808] mb-2 md:mb-6' />

                <div className='hidden md:grid md:grid-cols-[0.30fr_0.70fr] gap-6'>
                    
                    {/* REQUISITOS & STATUS - LADO ESQUERDO (Desktop/Tablet) */}
                    <div className='flex flex-col'>
                        <div className='bg-[#690808] text-white p-2 font-extrabold rounded-t-lg text-center'>REQUISITOS</div>
                        
                        <div className='bg-[#D5D5D5] p-3 flex flex-col'>
                            <ul className='text-black text-sm pl-4 bg-[#D5D5D5'>
                                <li className='mb-2'>• Aulas Mínimas: 170</li>
                            </ul>
                        </div>
                        
                        <div className='flex bg-[#690808] text-white p-2 font-extrabold text-center align-items-center justify-center'>
                            <User size={20} className='inline-block mr-2' />
                            <p>STATUS</p>
                        </div>
                        
                        <div className='bg-[#D5D5D5] p-12 flex flex-col'>
                            <div className='bg-[#690808] text-white p-2 font-extrabold text-center border-black border-t-2 border-l-2 border-r-2 text-[12px]'>
                                AULAS
                            </div>
                            <div className='bg-emerald-500 text-white p-2 font-extrabold text-center border-black border-2 text-[12px]'>
                                170
                            </div>
                        </div>
                        
                        <div className='flex justify-between text-xs mt-2 text-black'>
                            <span className='flex items-center gap-1'><span className='w-3 h-3 bg-green-500 border-black border'></span> Concluído</span>
                            <span className='flex items-center gap-1'><span className='w-3 h-3 bg-orange-400 border-black border'></span> Próximo</span>
                            <span className='flex items-center gap-1'><span className='w-3 h-3 bg-red-600 border-black border'></span> Longe</span>
                        </div>
                    </div>

                    {/* FAIXA ATUAL & PRÓXIMA FAIXA - LADO DIREITO (Desktop/Tablet) */}
                    <div className='bg-[#D5D5D5] rounded-lg flex flex-col'>
                        <div className='grid grid-cols-[1fr_2px_1fr] text-white font-extrabold text-center border-black border-b-3'>
                            <div className='bg-[#690808] p-2 rounded-tl-lg'>FAIXA ATUAL</div>
                            <div className='bg-[#D5D5D5]' />
                            <div className='bg-[#690808] p-2 rounded-tr-lg'>PRÓXIMA FAIXA</div>
                        </div>
                        <div className='grid grid-cols-3 items-center justify-center py-8 px-14 bg-[#D5D5D5] text-black'>
                            <div className='flex flex-col items-center justify-center'>
                                <span className='text-[#690808] font-extrabold text-lg'>ROXA</span>
                                <img src={FaixaRoxaSVG} alt='Faixa roxa' className='w-36 h-36' />
                            </div>
                            <div className='flex flex-col items-center justify-center relative'>
                                <ChevronsRight size={48} className='text-[#690808] z-10' />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <span className='text-[#690808] font-extrabold text-lg'>ROXA</span>
                                <img src={FaixaRoxaSVG} alt='Faixa roxa' className='w-36 h-36'/>
                            </div>
                        </div>
                        <div className='grid grid-cols-[1fr_2px_1fr] text-white font-extrabold text-center mt-auto border-black border-t-3'>
                            <div className='bg-[#690808] p-2 rounded-bl-lg'>Grau atual: {currentGrade}</div>
                            <div className='bg-[#D5D5D5]'/>
                            <div className='bg-[#690808] p-2 rounded-br-lg'>Próximo Grau: {nextGrade}</div>
                        </div>
                    </div>
                </div>

                {/* 2.2 LAYOUT MOBILE (Celular) - Empilhado e Invertido */}
                <div className='flex flex-col gap-4 md:hidden'>
                    
                    {/* LINHA 3: FAIXA ATUAL & PRÓXIMA FAIXA (Mobile) */}
                    {MobileFaixaSection}
                    
                    {/* LINHA 4: REQUISITOS & STATUS (Mobile) */}
                    {MobileRequisitosSection}

                </div>

                <div className=' text-black p-1 text-end rounded-b-lg text-[14px] md:text-[18px] mt-2'>
                    Graduará em: <span className='underline'>{nextGraduationDate}</span>
                </div>

                {/* 3. BOTÕES DE AÇÃO INFERIORES */}
                <div className='flex justify-end gap-8 mt-4 md:mt-6'>
                    <button onClick={onClose} className='bg-[#D5D5D5] text-black py-2 px-6 md:py-2 md:px-10 rounded-lg hover:bg-gray-200 transition-colors border-black border text-[14px] md:text-[20px]'>
                        Cancelar
                    </button>
                    <button className='bg-[#690808] text-white py-2 px-6 md:py-2 md:px-10 rounded-lg hover:bg-red-800 transition-colors text-[14px] md:text-[20px]'>
                        Confirmar
                    </button>
                </div>

                {isPromoteOpen && (
                    <PromoveStudent
                        isOpen={isPromoteOpen}
                        onClose={() => setPromoteOpen(false)}
                        onConfirm={handlePromote}
                        setToast={setToast}
                    />
                )}
            </div>
        </div>
    );
}