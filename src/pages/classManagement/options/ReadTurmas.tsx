// Em: src/pages/classManagement/VerTurmas.tsx

// MUDANÇA: Importar 'useState' e 'ReactNode'
import { useState, type FC, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCardGray'; 
// MUDANÇA: Importar o ícone 'Eye' para o título
import { Eye } from 'lucide-react'; 

// MUDANÇA: Importar Link para os botões das turmas
import { Link } from 'react-router-dom';

// MUDANÇA: Estes são os ícones das turmas (exemplo)
import turmaBabyIcon from './assets/turma-baby-icon.png';
import turmaInfantilIcon from './assets/turma-infantil-icon.png';
import turmaMistaIcon from './assets/turma-mista-icon.png';

// MUDANÇA: Este é um novo componente de botão, específico para esta página.
// Ele é diferente do seu 'ActionButton' (não é centralizado, tem largura total)
const ClassButton: FC<{ icon: ReactNode, label: string, to: string }> = ({ icon, label, to }) => (
    <Link 
        to={to}
        className='flex items-center gap-4 bg-[#690808] p-4 rounded-lg 
                   font-semibold text-lg hover:bg-[rgb(170,0,0)] transition-colors
                   w-full lg:w-96 shadow-[0_5px_15px_rgba(0,0,0,0.3)]'
    >
        {/* Ícone (div para manter o tamanho) */}
        <div className='w-8 h-8 flex items-center justify-center'>
            {icon}
        </div>
        {/* O 'flex-1' faz o texto ocupar o espaço e o 'text-center' centraliza */}
        <span className='flex-1 text-center'>{label}</span>
    </Link>
);

// MUDANÇA: Mock data para a lista de turmas (vem da página atual)
const turmasDaPagina = [
    { id: 1, label: 'TURMA BABY', icon: turmaBabyIcon },
    { id: 2, label: 'TURMA INFANTIL', icon: turmaInfantilIcon },
    { id: 3, label: 'TURMA MISTA', icon: turmaMistaIcon },
];

export const VerTurmas: FC = () => {
    
    // Lógica da paginação
    const [currentPage, setCurrentPage] = useState(2); 
    const totalPages = 10; 
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // TODO: Buscar os dados da API para a 'page' selecionada
    };

    return (
        <Box 
            component='div' 
            className='flex flex-col items-center justify-center h-full p-4'
        >
            <PageLayout 
                title='VER TURMAS' 
                icon={<Eye size={50} />} // MUDANÇA: Título e Ícone
            >
                {/* MUDANÇA: Conteúdo da página */}
                <div className='flex flex-col gap-6 mt-14 items-center'>
                    {/* Mapeia os dados da página atual para os botões */}
                    {turmasDaPagina.map(turma => (
                        <ClassButton
                            key={turma.id}
                            label={turma.label}
                            // O ícone é uma imagem
                            icon={<img src={turma.icon} alt={turma.label} className='w-8 h-8'/>}
                            // O link leva para a turma específica
                            to={`/gerenciamento-turmas/ver/${turma.id}`}
                        />
                    ))}
                </div>

            </PageLayout>
        </Box>
    );
}