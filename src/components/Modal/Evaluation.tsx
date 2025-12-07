import { X, User, SquarePen, ChevronsRight } from 'lucide-react'
import { type FC, useState, } from 'react'
import { ActionButton } from './components/actionButton';
import IconTeacher from './assets/Professor.svg';
import FaixaRoxaSVG from './assets/FaixaRoxa.svg'; 

interface StudentData {
    id: number
    name: string
    nameSocial: string
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

    const [promoverProfessor, setPromoverProfessor] = useState(false);

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            
            {/* Fundo escuro */}
            <div
                onClick={onClose}
                className='absolute inset-0 bg-black/40 backdrop-blur-[4px] '
            />

            {/* Modal - Ajustado para mobile first e centralizado no desktop */}
            <div className='relative w-[96%] max-w-[800px] bg-white rounded-xl shadow-2xl px-4 py-4 sm:px-8 sm:py-6 overflow-y-auto max-h-[90vh]
            transform transition-all duration-300 ease-out
               opacity-0 scale-95 animate-modal
            '>

                {/* Cabeçalho de Avaliação */}
                <div className='relative flex justify-center items-center mb-2'>
                    <h2 className='text-[#690808] font-extrabold text-xl md:text-3xl lg:text-4xl'>
                        AVALIAÇÃO
                    </h2>
                    <button onClick={onClose} className='absolute right-0 cursor-pointer'>
                        <X size={32} strokeWidth={3} className='text-[#690808]'/>
                    </button>
                </div>

                <div className='border-b-5 border-[#690808] mb-6' />

                {/* 1. SEÇÃO TOPO (Ações + Perfil) */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
                    
                    {/* Botões de Ação (Ações) - LADO ESQUERDO */}
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-4'>
                            <ActionButton
                                leftIcon={
                                    <img src={IconTeacher} alt='Professor' style={{ width: 50, height: 50 }} />
                                }
                                title={
                                    <>
                                        PROMOVER P/ <br /> PROFESSOR(A)
                                    </>
                                }
                                showCheckbox={true}
                                checkboxChecked={promoverProfessor}
                                onCheckboxChange={() => setPromoverProfessor(!promoverProfessor)}
                            />

                            <ActionButton
                                leftIcon={<User size={30} />}
                                title='EDITAR ALUNO(A)'
                                rightIcon={<SquarePen size={30} />}
                                onClick={() => console.log('EDITAR clicado')}
                            />
                        </div>
                    </div>

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

                    <div></div>
                </div>


                <div className='border-b-5 border-[#690808] mb-6' />

                {/* 2. SEÇÃO PRINCIPAL (REQUISITOS & FAIXAS) */}
                <div className='grid grid-cols-1 md:grid-cols-[0.30fr_0.70fr] gap-6'>
                    
                    {/* REQUISITOS & STATUS - LADO ESQUERDO */}
                    <div className='flex flex-col'>
                        <div className='bg-[#690808] text-white p-2 font-extrabold rounded-t-lg text-center'>REQUISITOS</div>
                        
                        <div className='bg-[#D5D5D5] p-3 flex flex-col'>

                        <ul className='text-black text-sm pl-4 bg-[#D5D5D5'>
                            <li className='mb-2'>• Aulas Mínimas: 170</li>
                            {/* Adicionar mais requisitos aqui */}
                        </ul>
                        </div>
                        {/* Lista de Requisitos */}
                        
                        <div className='flex bg-[#690808] text-white p-2 font-extrabold text-center align-items-center justify-center'>
                            <User size={20} className='inline-block mr-2' />
                            <p>STATUS</p>
                        </div>
                        
                        <div className='bg-[#D5D5D5] p-12 flex flex-col'>
                            {/* Aulas/Frequência */}
                            <div className='bg-[#690808] text-white p-2 font-extrabold text-center border-black border-t-2 border-l-2 border-r-2 text-[12px]'>
                                AULAS
                            </div>
                            <div className='bg-emerald-500 text-white p-2 font-extrabold text-center border-black border-2 text-[12px]'>
                                170
                            </div>

                        </div>
                            {/* Legenda do Status */}
                            <div className='flex justify-between text-xs mt-2 text-black'>
                                <span className='flex items-center gap-1'><span className='w-3 h-3 bg-green-500 border-black border'></span> Concluído</span>
                                <span className='flex items-center gap-1'><span className='w-3 h-3 bg-orange-400 border-black border'></span> Próximo</span>
                                <span className='flex items-center gap-1'><span className='w-3 h-3 bg-red-600 border-black border'></span> Longe</span>
                            </div>
                    </div>

                    {/* FAIXA ATUAL & PRÓXIMA FAIXA - LADO DIREITO */}
                    <div className='bg-[#D5D5D5] rounded-lg flex flex-col'>

                        {/* Topo */}
                        <div className='grid grid-cols-[1fr_2px_1fr] text-white font-extrabold text-center border-black border-b-3'>

                            {/* FAIXA ATUAL */}
                            <div className='bg-[#690808] p-2 rounded-tl-lg'>
                                FAIXA ATUAL
                            </div>

                            {/* Linha de separação */}
                            <div className='bg-[#D5D5D5]' />

                            {/* PRÓXIMA FAIXA */}
                            <div className='bg-[#690808] p-2 rounded-tr-lg'>
                                PRÓXIMA FAIXA
                            </div>
                        </div>

                        {/* Conteúdo com separação vertical */}
                        <div className='grid grid-cols-3 items-center justify-center py-8 px-14 bg-[#D5D5D5] text-black'>

                            {/* Coluna da faixa atual */}
                            <div className='flex flex-col items-center justify-center'>
                                <span className='text-[#690808] font-extrabold text-lg'>ROXA</span>

                                <img 
                                    src={FaixaRoxaSVG} 
                                    alt='Faixa roxa' 
                                    className='w-36 h-36'   // imagem maior
                                />
                            </div>

                            {/* Separador + Ícone */}
                            <div className='flex flex-col items-center justify-center relative'>
                                <ChevronsRight size={48} className='text-[#690808] z-10' />
                            </div>

                            {/* Coluna da próxima faixa */}
                            <div className='flex flex-col items-center justify-center'>
                                <span className='text-[#690808] font-extrabold text-lg'>ROXA</span>

                                <img 
                                    src={FaixaRoxaSVG} 
                                    alt='Faixa roxa' 
                                    className='w-36 h-36'
                                />
                            </div>
                        </div>

                        {/* Rodapé */}
                        <div className='grid grid-cols-[1fr_2px_1fr] text-white font-extrabold text-center mt-auto border-black border-t-3'>

                            {/* FAIXA ATUAL */}
                            <div className='bg-[#690808] p-2 rounded-bl-lg'>
                                Grau atual: {currentGrade}
                            </div>

                            {/* Linha de separação */}
                            <div className='bg-[#D5D5D5]'/>

                            {/* PRÓXIMA FAIXA */}
                            <div className='bg-[#690808] p-2 rounded-br-lg'>
                                Próximo Grau: {nextGrade}
                            </div>
                        </div>
                    </div>
                </div>

                <div className=' text-black p-1 text-end rounded-b-lg underline'>
                    Graduará em: <span className='underline'>{nextGraduationDate}</span>
                </div>

                {/* 3. BOTÕES DE AÇÃO INFERIORES */}
                <div className='flex justify-end gap-8 mt-6'>
                    <button onClick={onClose} className='bg-[#D5D5D5] text-black py-2 px-10 rounded-lg hover:bg-gray-200 transition-colors border-black border'>
                        Cancelar
                    </button>
                    <button className='bg-[#690808] text-white font-semibold py-2 px-10 rounded-lg hover:bg-red-800 transition-colors'>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}