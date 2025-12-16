import { X, User, SquarePen, Info } from 'lucide-react'
import { type FC, useState, useEffect } from 'react'

import IconTeacher from './assets/Professor.svg';
import { InputField } from './components/input';
import { ActionButton } from './components/actionButton';
import { PromoveStudent } from '../PromoveStudent/PromoveStudent';
import { FeedbackToast } from '../Feedback/Feedback';

import { fetchObterUsuarioDetalhado } from '../../services/modals/User/User';
import type { UsuarioDetalhado } from '../../services/modals/User/types/types';

interface StudentModalProps {
    isOpen: boolean
    onClose: () => void
    student: {
        id: string
        name: string
        nameSocial: string
        avatar: string
        role: string
    } | null
}

export const UserModal: FC<StudentModalProps> = ({ isOpen, onClose, student }) => {
    if (!isOpen || !student) return null

    const [isPromoteOpen, setPromoteOpen] = useState(false);

    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handlePromote = (user: string, pass: string) => {
        console.log('Promovendo com:', user, pass);
    };

    const [usuarioDetalhado, setUsuarioDetalhado] = useState<UsuarioDetalhado | null>(null);
    const [loading, setLoading] = useState(false);

    const genero = usuarioDetalhado?.genero;

    const isFeminino = genero === 'F';
    const isMasculino = genero === 'M';
    const isOutro = genero === 'O';

    useEffect(() => {
        if (!isOpen || !student?.id) return;

        const token = localStorage.getItem('token') ?? undefined;

        async function loadUsuario() {
            try {
                setLoading(true);
                if (!student) return;
                const response = await fetchObterUsuarioDetalhado(student.id, token);
                setUsuarioDetalhado(response.usuario);
            } catch (error) {
                console.error('Erro ao buscar usuário detalhado:', error);
            } finally {
                setLoading(false);
            }
        }

        loadUsuario();
    }, [isOpen, student]);
    
    const turmas = usuarioDetalhado?.turma_matriculas
    ?.map(t => t.turma.nome_turma)
    .join(', ');

    const telefoneResponsavel = usuarioDetalhado?.responsaveis
    ?.map(r => r.telefone)
    .filter(Boolean)
    .join(', ');

    const dataNascimentoFormatada = usuarioDetalhado?.dataNascimento
    ? new Date(usuarioDetalhado.dataNascimento).toLocaleDateString('pt-BR')
    : '—';

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

            {/* Modal */}
            <div className='relative w-[96%] max-w-[1000px] bg-white rounded-xl shadow-2xl px-4 py-4 sm:px-8 sm:py-6 transform transition-all duration-300 ease-out
            opacity-0 scale-95 animate-modal'>

                {/* Cabeçalho */}
                <div className='relative flex justify-center items-center mb-0 md:mb-2'>
                    <h2 className='text-[#690808] font-extrabold text-[18px] md:text-3xl lg:text-4xl uppercase'>
                        DADOS DO {usuarioDetalhado?.tipo}
                    </h2>

                    <button onClick={onClose} className='absolute right-0 cursor-pointer'>
                        <X size={20} strokeWidth={3} className='text-[#690808] sm:size-10'/>
                    </button>
                </div>

                <div className='border-b-5 border-[#690808] mb-2 md:mb-12' />

                {/* 1. LAYOUT DESKTOP/TABLET (3 COLUNAS) - VISÍVEL APENAS EM MD: */}
                {/* --------------------------------------------------------------------------------------------------------------------------------------- */}
                <div className='hidden md:grid md:grid-cols-3 md:gap-8 mb-2'>

                    {/* COLUNA 1: AÇÕES (DESKTOP) */}
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

                    {/* COLUNA 2: PERFIL (DESKTOP) */}
                    <div className='flex flex-col items-center text-center gap-2'>
                        <img
                            src={usuarioDetalhado?.imagem_perfil_url ?? student.avatar}
                            className='w-[150px] h-[150px] rounded-full'
                        />

                        <h3 className='pt-2 text-lg text-black underline'>
                            {usuarioDetalhado?.nome_social ?? usuarioDetalhado?.nome ?? student.name}
                        </h3>

                        <p className='text-sm text-[#690808]'>
                            <span className='text-[#690808] font-extrabold'>
                                Aulas Totais:
                            </span>
                            {''}{usuarioDetalhado?.aulas}
                        </p>
                    </div>

                    {/* COLUNA 3: HISTÓRICO (DESKTOP) */}
                    <div className='bg-[#D5D5D5] text-black rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
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
                                    pl-4
                                    pr-2                                      
                                    scrollbar-thin scrollbar-thumb-gray-700   
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
                {/* --------------------------------------------------------------------------------------------------------------------------------------- */}


                {/* 2. LAYOUT MOBILE (EMPILHADO) - VISÍVEL APENAS EM TELAS PEQUENAS */}
                {/* --------------------------------------------------------------------------------------------------------------------------------------- */}
                <div className='flex flex-col gap-2 md:hidden mb-3'>
                    
                    {/* PERFIL (Mobile Top) */}
                    <div className='flex flex-col items-center text-center order-1'>
                        <img
                            src={usuarioDetalhado?.imagem_perfil_url ?? student.avatar}
                            className='w-[70px] h-[70px] rounded-full'
                        />

                        <h3 className='pt-2 text-lg text-black underline'>
                            {usuarioDetalhado?.nome_social ?? usuarioDetalhado?.nome ?? student.name}
                        </h3>

                        {/* Texto menor para mobile */}
                        <p className='text-xs text-[#690808]'>
                            <span className='text-[#690808] font-extrabold'>
                                Aulas Totais:
                            </span>
                            {''}{usuarioDetalhado?.aulas}
                        </p>
                    </div>

                    {/* AÇÕES E HISTÓRICO (Mobile Lado a Lado) */}
                    <div className='flex gap-2 order-2 items-start'>
                        
                        {/* AÇÕES (Mobile Esquerda) */}
                        <div className='flex flex-col gap-2 flex-1'>
                            <ActionButton
                                leftIcon={
                                    <img src={IconTeacher} alt='Professor' style={{ width: 40, height: 25 }} />
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

                        {/* HISTÓRICO (Mobile Direita) */}
                        <div className='bg-[#D5D5D5] text-black rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.4)] flex-1'>
                            <div 
                                className='bg-[#690808] text-white p-2 
                                        rounded-t-[10px]            
                                        border-b-2 border-[#3E0404]' 
                            >
                                <h4 className='font-semibold text-center !text-[8px]'>
                                    HISTÓRICO DE GRADUAÇÕES
                                </h4>
                            </div>
                            <div 
                                className='p-1 text-[10px] max-h-24 
                                        overflow-y-auto 
                                        rounded-b-[10px]
                                        pl-3 pr-1
                                        scrollbar-thin scrollbar-thumb-gray-700
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
                </div>
                {/* --------------------------------------------------------------------------------------------------------------------------------------- */}

                {/* Título das informações */}
                <div className='border-b-5 border-[#690808] mb-2'>
                    <h4 className='text-center text-[#690808] font-extrabold mb-2 text-[12px] md:text-2xl uppercase'>
                        INFORMAÇÕES DO {usuarioDetalhado?.tipo}
                    </h4>   
                </div>

                {/* FORMULÁRIO. EM CELULAR: grid grid-cols-2. Tablet/Desktop: md:grid-cols-3. */}
                <div className='grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-2 md:gap-y-8 text-[10px] md:text-sm text-black mb-1 md:mb-8'> 

                    <InputField 
                        label='Nome completo:' 
                        value={usuarioDetalhado?.nome ?? '—'} 
                        hasInfoIcon
                    />
                    
                    {/* 2. CPF */}
                    <InputField 
                        label='CPF:' 
                        value={usuarioDetalhado?.cpf ?? '—'}  
                        hasInfoIcon
                    />
                    
                    {/* 3. Data de nascimento */}
                    <InputField 
                        label='Data de nascimento:' 
                        value={dataNascimentoFormatada} 
                    />
                    
                    {/* 4. Endereço */}
                    <InputField 
                        label='Endereço:' 
                        value={usuarioDetalhado?.endereco ?? '—'}
                    />
                    
                    {/* 5. Telefone */}
                    <InputField 
                        label='Telefone:' 
                        value={usuarioDetalhado?.telefone ?? '—'}  
                    />
                    
                    {/* 6. Cargo */}
                    <InputField 
                        label='Cargo:' 
                        value={usuarioDetalhado?.tipo ?? '—'} 
                        hasInfoIcon
                    />

                    {/* 7. Gênero (AJUSTE APLICADO: col-span-1 para md: e col-span-2 para mobile) */}
                    <div className='col-span-2 md:col-span-1'>
                        <Info
                            size={20}
                            className='inline-block mr-2 mb-1 text-[#690808] w-4 h-4 md:w-6 md:h-6'
                            strokeWidth={3}
                        />

                        <label className='font-semibold text-[#690808] !text-[8px] md:!text-sm'>
                            Gênero:
                        </label>

                        <div className='flex gap-4 mt-2'>
                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='genero'
                                    disabled
                                    checked={isFeminino}
                                    readOnly
                                />
                                Feminino
                            </label>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='genero'
                                    disabled
                                    checked={isMasculino}
                                    readOnly
                                />
                                Masculino
                            </label>

                            <label className='flex items-center gap-1'>
                                <input
                                    type='radio'
                                    name='genero'
                                    disabled
                                    checked={isOutro}
                                    readOnly
                                />
                                Outro
                            </label>
                        </div>
                    </div>

                    {/* 8. Faixa (Deve seguir imediatamente após o Gênero no desktop) */}
                    <InputField 
                        label='Faixa Atual:' 
                        value={usuarioDetalhado?.faixa?.corFaixa ?? '—'} 
                    />

                    {/* 9. Grau */}
                    <InputField 
                        label='Grau atual:' 
                        value={usuarioDetalhado?.grau ? `${usuarioDetalhado.grau}º` : '—'} 
                    />

                    {/* 10. Turma */}
                    <InputField 
                        label='Turma:' 
                        value={turmas || '—'} 
                    />

                    {/* 11. Matrícula */}
                    <InputField 
                        label='Matrícula:' 
                        value={usuarioDetalhado?.num_matricula ?? '—'} 
                    />

                    {/* 12. Telefone responsável */}
                    <InputField 
                        label='Telefone responsável:' 
                        value={telefoneResponsavel || '—'} 
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