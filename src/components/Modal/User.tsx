import { X, User, SquarePen, GraduationCap } from 'lucide-react'
import { type FC } from 'react'

import IconTeacher from './assets/Professor.svg';

interface StudentModalProps {
    isOpen: boolean
    onClose: () => void
    student: {
        id: number
        name: string
        avatar: string
        role: string
    } | null
}

export const UserModal: FC<StudentModalProps> = ({ isOpen, onClose, student }) => {
    if (!isOpen || !student) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>

            {/* Fundo escuro */}
            <div
                onClick={onClose}
                className='absolute inset-0 bg-black/40 backdrop-blur-[4px] '
            />

            {/* Modal */}
            <div className='relative w-[96%] max-w-[1000px] bg-white rounded-xl shadow-2xl px-8 py-6'>

                {/* Cabeçalho */}
                <div className='relative flex justify-center items-center mb-2'>
                    <h2 className='text-[#690808] font-extrabold text-2xl md:text-3xl lg:text-4xl'>
                        DADOS DO ALUNO
                    </h2>

                    <button onClick={onClose} className='absolute right-0 cursor-pointer'>
                        <X size={32} strokeWidth={3} className='text-[#690808]'/>
                    </button>
                </div>

                <div className='border-b-5 border-[#690808] mb-6' />

                {/* TOPO: Ações + Avatar + Histórico */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mb-8'>

                    {/* AÇÕES */}
                    <div className='flex flex-col gap-4'>
                        <button className='bg-[#690808] hover:opacity-90 text-white rounded-lg p-3 flex items-center gap-1 text-sm justify-between cursor-pointer w-full shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
        
                            <img 
                                src={IconTeacher} 
                                alt='Ícone Professor' 
                                style={{ width: '50px', height: '50px' }} 
                            />

                            <div className='flex items-center gap-2'>
                                <span className='leading-tight'>
                                    PROMOVER P/ <br />PROFESSOR(A)
                                </span>
                            </div>

                            {/* 🚨 CHECKBOX SIMPLIFICADO E ESTÁVEL */}
                            <input 
                                type='checkbox' 
                                className='
                                    appearance-none        /* Remove o estilo padrão */
                                    w-7 h-7               /* Tamanho */
                                    border-2              /* Borda de 3px */
                                    border-white          /* Cor da borda branca */
                                    rounded-md            
                                    bg-transparent        /* Fundo transparente (mostra o bg do botão) */
                                    flex-shrink-0         
                                    cursor-pointer        
                                    
                                    /* ESTILO QUANDO MARCADO: Fundo se torna branco/claro */
                                    checked:bg-white      
                                    /* Adiciona um SVG de check mark como background image (solução mais estável) */
                                    checked:bg-check-mark 
                                    
                                    transition-colors     
                                '
                                style={{
                                    // Adiciona o ícone de checkmark como background quando marcado.
                                    // Você precisaria de uma classe utilitária Tailwind 'bg-check-mark'
                                    // Se não tiver essa utilidade, use uma cor pura por enquanto:
                                    // checked:bg-white
                                }}
                            />
                        </button>
                        
                        <button className='bg-[#690808] hover:opacity-90 text-white rounded-lg p-3 flex items-center gap-2 justify-between text-sm cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
                            <User size={30}/>
                            EDITAR ALUNO(A)
                            <SquarePen size={30}/>
                        </button>

                        <button className='bg-[#690808] hover:opacity-90 text-white rounded-lg p-3 flex items-center gap-2 justify-between text-sm cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.4)]'>
                            <User size={30}/>
                            PROMOVER ALUNO(A)
                            <GraduationCap size={30}/>
                        </button>
                    </div>

                    {/* PERFIL */}
                    <div className='flex flex-col items-center text-center gap-2'>

                        <img
                        src={student.avatar}
                        className='w-[90px] h-[90px] rounded-full bg-gray-200 p-2'
                        />

                        <h3 className='font-semibold text-lg'>
                        {student.name}
                        </h3>

                        <p className='text-sm'>
                        <span className='text-[#690808] font-semibold'>
                            Aulas Totais:
                        </span>{' '}
                            30/50
                        </p>

                    </div>

                    {/* HISTÓRICO */}
                    <div className='bg-[#8B0000] text-white rounded-lg p-3 shadow-lg'>

                        <h4 className='font-semibold mb-2 text-center'>
                            HISTÓRICO DE GRADUAÇÕES
                        </h4>

                        <div className='bg-gray-200 text-black rounded-md p-2 text-xs max-h-28 overflow-y-auto'>
                        <p className='text-orange-600'>01/01/2026: Faixa Roxa → Marrom</p>
                        <p className='text-purple-700'>01/07/2025: Faixa Roxa → 4º Grau</p>
                        <p className='text-purple-700'>01/01/2025: Faixa Roxa → 3º Grau</p>
                        <p>01/07/2024: Faixa Azul → Roxa</p>
                        <p>01/01/2024: Faixa Verde → Azul</p>
                        </div>

                    </div>
                </div>

                {/* Título das informações */}
                <div className='border-b-2 border-[#690808] mb-6'>
                    <h4 className='text-center text-[#690808] font-bold mb-2'>
                        INFORMAÇÕES DO ALUNO(A)
                    </h4>
                </div>

                {/* FORMULÁRIO */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm'>

                    <div>
                        <label className='font-semibold text-[#690808]'>Nome completo:</label>
                        <input
                        value={student.name}
                        readOnly
                        className='w-full bg-gray-200 rounded-full px-4 py-2 mt-1'
                        />
                    </div>

                    <div>
                        <label className='font-semibold text-[#690808]'>CPF:</label>
                        <input
                            value='XXX.XXX.XXX-XX'
                            readOnly
                            className='w-full bg-gray-200 rounded-full px-4 py-2 mt-1'
                        />
                    </div>

                    <div>
                        <label className='font-semibold text-[#690808]'>Data de nascimento:</label>
                        <input
                            value='18/01/1980'
                            readOnly
                            className='w-full bg-gray-200 rounded-full px-4 py-2 mt-1'
                        />
                    </div>

                    <div>
                        <label className='font-semibold text-[#690808]'>Telefone:</label>
                        <input
                            value='(XX) XXXXX-XXXX'
                            readOnly
                            className='w-full bg-gray-200 rounded-full px-4 py-2 mt-1'
                        />
                    </div>

                    <div className='md:col-span-2'>
                        <label className='font-semibold text-[#690808]'>Endereço:</label>
                        <input
                            value='Rua Obi Jucá Diniz, 153, Prado'
                            readOnly
                            className='w-full bg-gray-200 rounded-full px-4 py-2 mt-1'
                        />
                    </div>

                    {/* Gênero */}
                    <div>
                        <label className='font-semibold text-[#690808]'>Gênero:</label>
                        <div className='flex gap-4 mt-2'>
                            <label className='flex items-center gap-1'>
                                <input type='radio' name='genero'/>
                                Feminino
                            </label>

                            <label className='flex items-center gap-1'>
                                <input type='radio' name='genero'/>
                                Masculino
                            </label>

                            <label className='flex items-center gap-1'>
                                <input type='radio' name='genero'/>
                                Outro
                            </label>
                        </div>
                    </div>

                    {/* Faixa */}
                    <div>
                        <label className='font-semibold text-[#690808]'>Faixa Atual:</label>
                        <select className='w-full bg-gray-200 rounded-full px-4 py-2 mt-1'>
                            <option>Branca</option>
                            <option>Azul</option>
                            <option>Roxa</option>
                            <option>Marrom</option>
                            <option>Preta</option>
                        </select>
                    </div>

                    {/* Turma e Grau */}
                    <div>
                        <label className='font-semibold text-[#690808]'>Turma:</label>
                        <select className='w-full bg-gray-200 rounded-full px-4 py-2 mt-1'>
                            <option>Mista</option>
                            <option>Infantil</option>
                            <option>Avançada</option>
                        </select>
                    </div>

                    <div>
                        <label className='font-semibold text-[#690808]'>Grau Atual:</label>
                        <select className='w-full bg-gray-200 rounded-full px-4 py-2 mt-1'>
                            <option>0º</option>
                            <option>1º</option>
                            <option>2º</option>
                            <option>3º</option>
                            <option>4º</option>
                        </select>
                    </div>

                    {/* Matrícula e responsável */}
                    <div>
                        <label className='font-semibold text-[#690808]'>Matrícula:</label>
                        <input
                            value='20231031020200'
                            readOnly
                            className='w-full bg-gray-200 rounded-full px-4 py-2 mt-1'
                        />
                    </div>

                    <div>
                        <label className='font-semibold text-[#690808]'>Telefone responsável:</label>
                        <input
                            placeholder='Insira um número'
                            className='w-full bg-gray-200 rounded-full px-4 py-2 mt-1'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
