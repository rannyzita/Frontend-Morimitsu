import { useState, type FC, } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCardGray';
import { Pagination } from '../../../components/Pagination/Pagination';
import { Award } from 'lucide-react';

import { SearchInput } from '../../../components/SearchInput/SearchInput';

import turmaBabyIcon from './assetsTest/IconBaby.png';
import studentAvatar1 from './assetsTest/IconBaby.png';
import studentAvatar2 from './assetsTest/TurmaInfantil.png';
import studentAvatar3 from './assetsTest/iconMista.png';
import studentAvatar4 from './assetsTest/IconBaby.png';

// --- DADOS MOCKADOS ---
const mockTurma = {
    id: '1',
    nome: 'TURMA BABY',
    icone: turmaBabyIcon,
};
const initialAlunos = [
    { id: 1, name: 'Antônio Henrique Pereira da Silva', avatar: studentAvatar1, current: 30, total: 40, isPromoted: false },
    { id: 2, name: 'Anna Cristina Laurencio de Oliveira', avatar: studentAvatar2, current: 30, total: 40, isPromoted: false },
    { id: 3, name: 'Juliana Souza da Paz', avatar: studentAvatar3, current: 30, total: 40, isPromoted: false },
    { id: 4, name: 'Enzo Alves da Costa', avatar: studentAvatar4, current: 30, total: 40, isPromoted: false },
];

// --- Subcomponente para a Lista de Alunos ---
interface StudentListItemProps {
    avatar: string;
    name: string;
    currentClasses: number;
    totalClasses: number;
    studentId: number;
    isPromoted: boolean;
    onTogglePromoted: (studentId: number, isPromoted: boolean) => void;
}

const StudentListItem: FC<StudentListItemProps> = ({
    avatar,
    name,
    currentClasses,
    totalClasses,
    studentId,
    isPromoted,
    onTogglePromoted
}) => {
    return (
        <div className="flex items-center gap-3 bg-[#690808] p-3 rounded-lg w-full lg:w-[950px]
                        shadow-[0_5px_15px_rgba(0,0,0,0.3)]">

            <img src={avatar} alt={name} className="w-10 h-10 rounded-full flex-shrink-0" />
            <Award size={24} className="text-white flex-shrink-0" />
            <div className="h-10 border-l border-white mx-1 flex-shrink-0" />
            <span className="flex-1 text-white font-semibold truncate text-left">{name}</span>
            <div className="h-10 border-l border-white mx-1 flex-shrink-0" />
            <span className="text-white text-sm flex-shrink-0">Aulas: {currentClasses}/{totalClasses}</span>
            <div className="h-10 border-l border-white mx-1 flex-shrink-0" />

            <div className="relative flex flex-col items-center bg-[#3E0404] py-2 px-1 rounded w-32 flex-shrink-0">
                <div className="pr-5">
                    <span className="block text-white text-[10px] leading-tight text-center">PROMOVER P/</span>
                    <span className="block text-white text-[10px] leading-tight text-center">PROFESSOR(A)</span>
                </div>
                <input
                    type="checkbox"
                    checked={isPromoted}
                    onChange={(e) => onTogglePromoted(studentId, e.target.checked)}
                    className="absolute right-2 top-1/2 -translate-y-1/2
                                w-4 h-4 bg-transparent border border-white rounded-sm appearance-none
                                checked:bg-white checked:border-transparent cursor-pointer
                                focus:outline-none focus:ring-1 focus:ring-white"
                />
            </div>
        </div>
    );
};

// --- Componente Principal da Página ---
export const VerDetalhesTurma: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(2);
    const totalPages = 10;
    const [alunos, setAlunos] = useState(initialAlunos);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // --- MUDANÇA NA LÓGICA DO CHECKBOX ---
    const handleTogglePromoted = (studentId: number, isChecked: boolean) => {
        const updatedAlunos = alunos.map(aluno => {
            if (aluno.id === studentId && isChecked) {
                return { ...aluno, isPromoted: true };
            }
            return { ...aluno, isPromoted: false };
        });
        setAlunos(updatedAlunos);
        console.log(`Aluno ${studentId} ${isChecked ? 'promovido' : 'despromovido (e outros despromovidos)'}`);
        // TODO: Fazer chamada de API para salvar a alteração
    };

    const filteredAlunos = alunos.filter(aluno =>
        aluno.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const turma = mockTurma;

    return (
        <Box
            component='div'
            className='flex flex-col items-center justify-center h-full p-4'
        >
            <PageLayout
                title={turma.nome.toUpperCase()}
                icon={<img src={turma.icone} alt={turma.nome} className='w-10 h-10' />}
            >
                <div className='flex flex-col h-full gap-6 pt-8'>

                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder='Digite o nome do aluno'
                        className='w-full lg:w-[650px] mx-auto'
                    />

                    <div className='flex-1 flex flex-col gap-3 items-center overflow-y-auto pr-2 mt-4'>
                        {filteredAlunos.map(aluno => (
                            <StudentListItem
                                key={aluno.id}
                                studentId={aluno.id}
                                name={aluno.name}
                                avatar={aluno.avatar}
                                currentClasses={aluno.current}
                                totalClasses={aluno.total}
                                isPromoted={aluno.isPromoted}
                                onTogglePromoted={handleTogglePromoted}
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