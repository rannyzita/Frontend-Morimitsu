import { useState, type FC, } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCardGray'; 
import { Pagination } from '../../../components/Pagination/Pagination'; 
import { Award, X } from 'lucide-react'; 

import { SearchInput } from '../../../components/SearchInput/SearchInput'; 

import turmaBabyIcon from './assetsTest/IconBaby.png';
import studentAvatar1 from './assetsTest/IconBaby.png'; 
import studentAvatar2 from './assetsTest/TurmaInfantil.png';
import studentAvatar3 from './assetsTest/iconMista.png';
import studentAvatar4 from './assetsTest/IconBaby.png'; 

// --- DADOS MOCKADOS (Substitua pela sua API) ---
const mockTurma = {
    id: '1',
    nome: 'TURMA BABY',
    icone: turmaBabyIcon,
};
const mockAlunos = [
    { id: 1, name: 'Antônio Henrique Pereira da Silva', avatar: studentAvatar1, current: 30, total: 40 },
    { id: 2, name: 'Anna Cristina Laurencio de Oliveira', avatar: studentAvatar2, current: 30, total: 40 },
    { id: 3, name: 'Juliana Souza da Paz', avatar: studentAvatar3, current: 30, total: 40 },
    { id: 4, name: 'Enzo Alves da Costa', avatar: studentAvatar4, current: 30, total: 40 },
    // Adicione mais alunos para testar a rolagem
];

interface StudentListItemProps {
    avatar: string;
    name: string;
    currentClasses: number;
    totalClasses: number;
    onPromote: () => void;
    onRemove: () => void;
}

const StudentListItem: FC<StudentListItemProps> = ({ avatar, name, currentClasses, totalClasses, onPromote, onRemove }) => {
    return (
        <div className='flex items-center gap-3 bg-[#690808] p-3 rounded-[10px] w-full lg:w-[950px]
                        shadow-[0_5px_15px_rgba(0,0,0,0.3)]'>
            
            <img src={avatar} alt={name} className='w-10 h-10 rounded-full flex-shrink-0' />
            <Award size={24} className='text-white flex-shrink-0' />
            
            <span className='flex-1 text-white font-semibold truncate'>{name}</span>
            
            <div className='flex flex-col items-end text-xs flex-shrink-0'>
                <span className='text-white'>Aulas: {currentClasses}/{totalClasses}</span>
                <button 
                    onClick={onPromote} 
                    className='bg-red-800 text-white p-1 rounded hover:bg-red-700 mt-1'
                >
                    PROMOVER P/ PROFESSOR(A)
                </button>
            </div>

            <button onClick={onRemove} className='text-white hover:text-gray-300 ml-2 flex-shrink-0'>
                <X size={20} />
            </button>
        </div>
    );
};


// --- Componente Principal da Página ---
export const VerDetalhesTurma: FC = () => {
    const { id } = useParams<{ id: string }>(); 
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(2);
    const totalPages = 10;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const filteredAlunos = mockAlunos.filter(aluno => 
        aluno.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const turma = mockTurma; 

    return (
        // 1. Estrutura Externa (Centraliza o card na tela)
        <Box 
            component='div' 
            className='flex flex-col items-center justify-center h-full p-4'
        >
            {/* 2. Layout do Card (Título e Ícone dinâmicos) */}
            <PageLayout 
                title={turma.nome.toUpperCase()} 
                icon={<img src={turma.icone} alt={turma.nome} className='w-10 h-10' />}
            >
                {/* 3. Conteúdo Interno (h-full para grudar a paginação embaixo) */}
                <div className='flex flex-col h-full gap-6 pt-8'>
                    
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery} 
                        placeholder='Digite o nome do aluno'
                        className='w-full lg:w-[650px] mx-auto' 
                    />

                    <div className='flex-1 flex flex-col gap-3 items-center overflow-y-auto pr-2 pt-8'>
                        {filteredAlunos.map(aluno => (
                            <StudentListItem
                                key={aluno.id}
                                name={aluno.name}
                                avatar={aluno.avatar}
                                currentClasses={aluno.current}
                                totalClasses={aluno.total}
                                onPromote={() => console.log('Promover ' + aluno.id)}
                                onRemove={() => console.log('Remover ' + aluno.id)}
                            />
                        ))}
                    </div>
                    
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </PageLayout>
        </Box>
    );
}