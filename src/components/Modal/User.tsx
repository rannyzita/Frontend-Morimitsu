import { X, User, SquarePen, Info } from 'lucide-react'
import { type FC, useState } from 'react'

import IconTeacher from './assets/Professor.svg';
import { InputField } from './components/input';
import { ActionButton } from './components/actionButton';
import { PromoveStudent } from '../PromoveStudent/PromoveStudent';
import { FeedbackToast } from '../Feedback/Feedback';

interface StudentModalProps {
    isOpen: boolean
    onClose: () => void
    student: {
        id: number
        name: string
        nameSocial: string
        avatar: string
        role: string
    } | null
}

export const UserModal: FC<StudentModalProps> = ({ isOpen, onClose, student }) => {
    if (!isOpen || !student) return null

    const [promoverProfessor, setPromoverProfessor] = useState(false);

    const [isPromoteOpen, setPromoteOpen] = useState(false);

    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handlePromote = (user: string, pass: string) => {
        console.log('Promovendo com:', user, pass);
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>

            {toast && (
                <FeedbackToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Fundo escuro */}
            <div
                onClick={onClose}
                className='absolute inset-0 bg-black/40 backdrop-blur-[4px] '
            />

            {/* Modal */}0
            <div className='relative w-[96%] max-w-[1000px] bg-white rounded-xl shadow-2xl px-4 py-4 sm:px-8 sm:py-6 transform transition-all duration-300 ease-out
            opacity-0 scale-95 animate-modal'>

                {/* Cabeçalho */}
                <div className='relative flex justify-center items-center mb-2'>
                    <h2 className='text-[#690808] font-extrabold text-xl md:text-3xl lg:text-4xl uppercase'>
                        DADOS DO {student.role}
                    </h2>

                    <button onClick={onClose} className='absolute right-0 cursor-pointer'>
                        <X size={20} strokeWidth={3} className='text-[#690808] sm:size-10'/>
                    </button>
                </div>

                <div className='border-b-5 border-[#690808] mb-6' />

                {/* TOPO: Ações + Avatar + Histórico */}
                <div className='flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-10 mb-8'>

                    {/* AÇÕES */}
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

                    {/* PERFIL */}
                    <div className='flex flex-col items-center text-center gap-2'>

                        <img
                            src={student.avatar}
                            className='w-[150px] h-[150px] rounded-full'
                        />

                        <h3 className='pt-2 text-lg text-black underline'>
                            {student.nameSocial}
                        </h3>

                        <p className='text-sm text-[#690808]'>
                            <span className='text-[#690808] font-extrabold'>
                                Aulas Totais:
                            </span>{' '}
                                30/50
                        </p>
                    </div>

                    {/* HISTÓRICO */}
                    <div className='bg-[#D5D5D5] text-black rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
    
                        {/* 1. CABEÇALHO VERMELHO ESCURO */}
                        <div 
                            className='bg-[#690808] text-white p-3 
                                    rounded-t-[10px]            
                                    border-b-2 border-[#3E0404]' 
                        >
                            <h4 className='font-semibold text-center text-[14px]'>
                                HISTÓRICO DE GRADUAÇÕES
                            </h4>
                        </div>

                        <div 
                            className='p-2 text-xs max-h-40 
                                    overflow-y-auto 
                                    rounded-b-[10px]
                                    
                                    // 🛠️ 1. ROLAGEM NATURAL (OVERLAY) E 🛠️ 3. AFASTAR DA BORDA
                                    pl-4
                                    pr-2                                      /* Adiciona padding/espaço à direita */
                                    scrollbar-thin scrollbar-thumb-gray-700   /* Classes (se você usar o plugin) */
                                    
                                    /* Estilo da barra de rolagem (Se o plugin não estiver instalado, mantenha este bloco): */
                                    [&::-webkit-scrollbar]:w-2 
                                    [&::-webkit-scrollbar-thumb]:bg-gray-700 
                                    [&::-webkit-scrollbar-thumb]:rounded-full'
                        >
                            <p className='text-orange-600'>01/01/2026: Faixa Roxa → Faixa Marrom</p>
                            <p className='text-purple-700'>01/07/2025: Faixa Roxa → 4º Grau</p>
                            <p className='text-purple-700'>01/01/2025: Faixa Roxa → 3º Grau</p>
                            <p className='text-black'>01/07/2024: Faixa Azul → Roxa</p>
                            <p className='text-black'>01/01/2024: Faixa Verde → Azul</p>
                            <p className='text-black'>01/07/2023: Faixa Branca → Verde</p> 
                            <p className='text-black'>01/01/2023: Faixa Branca → 1º Grau</p> 
                            <p className='text-black'>01/07/2022: Novo Aluno</p> 
                            <p className='text-black'>01/01/2022: Primeiro Treino</p> 
                            <p className='text-black'>01/01/2022: Primeiro Treino</p> 
                            <p className='text-black'>01/01/2022: Primeiro Treino</p> 
                            <p className='text-black'>01/01/2022: Primeiro Treino</p> 
                            <p className='text-black'>01/01/2022: Primeiro Treino</p> 
                            <p className='text-black'>01/01/2022: Primeiro Treino</p> 
                            <p className='text-black'>01/01/2022: Primeiro Treino</p> 
                            <p className='text-black'>01/01/2022: Primeiro Treino</p> 
                        </div>
                    </div>
                </div>

                {/* Título das informações */}
                <div className='border-b-5 border-[#690808] mb-6'>
                    <h4 className='text-center text-[#690808] font-extrabold mb-2 text-2xl uppercase'>
                        INFORMAÇÕES DO {student.role}
                    </h4>
                </div>

                {/* FORMULÁRIO */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 text-sm text-black mb-8'>

                    <InputField 
                        label='Nome completo:' 
                        value={student.name} 
                        hasInfoIcon
                    />
                    
                    {/* 2. CPF */}
                    <InputField 
                        label='CPF:' 
                        value='XXX.XXX.XXX-XX' 
                        hasInfoIcon
                    />
                    
                    {/* 3. Data de nascimento */}
                    <InputField 
                        label='Data de nascimento:' 
                        value='18/01/1980' 
                    />
                    
                    {/* 4. Endereço */}
                    <InputField 
                        label='Endereço:' 
                        value='Rua Obi Jucá Diniz, 153, Prado' 
                    />
                    
                    {/* 5. Telefone */}
                    <InputField 
                        label='Telefone:' 
                        value='(XX) XXXXX-XXXX' 
                    />
                    
                    {/* 6. Cargo */}
                    <InputField 
                        label='Cargo:' 
                        value='Coordenador(a)' 
                        hasInfoIcon
                    />

                    {/* 7. Gênero (Mantido manualmente por ser Radio) */}
                    <div>
                        <Info size={20} className='inline-block mr-2 mb-1 text-[#690808]' strokeWidth={3}/>
                        <label className='font-semibold text-[#690808]'>Gênero:</label>
                        <div className='flex gap-4 mt-2'>
                            <label className='flex items-center gap-1'>
                                <input type='radio' name='genero' disabled checked={true} readOnly/>
                                Feminino
                            </label>
                            <label className='flex items-center gap-1 opacity-50'>
                                <input type='radio' name='genero' disabled/>
                                Masculino
                            </label>
                            <label className='flex items-center gap-1 opacity-50'>
                                <input type='radio' name='genero' disabled/>
                                Outro
                            </label>
                        </div>
                    </div>

                    {/* 8. Faixa */}
                    {/* <div>
                        <label className='font-semibold text-[#690808]'>Faixa Atual:</label>
                        <select disabled className='w-full bg-[#D5D5D5] rounded-full px-4 py-2 mt-1 shadow-[0_5px_15px_rgba(0,0,0,0.4)] appearance-none'>
                            <option selected disabled>Roxa</option>
                            <option disabled>Branca</option>
                            <option disabled>Azul</option>
                            <option disabled>Marrom</option>
                            <option disabled>Preta</option>
                        </select>
                    </div> */}

                    <InputField 
                        label='Faixa Atual:' 
                        value='Roxa' 
                    />

                    {/* 9. Grau */}

                    <InputField 
                        label='Grau atual:' 
                        value='2º' 
                    />

                    {/* 10. Turma */}
                    <InputField 
                        label='Turma:' 
                        value='Mista' 
                    />


                    {/* 11. Matrícula */}
                    <InputField 
                        label='Matrícula:' 
                        value='20231031020200' 
                    />

                    {/* 12. Telefone responsável */}
                    <InputField 
                        label='Telefone responsável:' 
                        value='(XX) XXXXX-XXXX' 
                    />
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
    )
}
