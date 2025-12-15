import { type FC, useState } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCard';
import { Cake } from 'lucide-react';
import { BirthdayCarousel } from '../../components/ScrollBirthday/scrollBirthday';
import { UserModal } from '../../components/Modal/User';
import { 
    BIRTHDAYS_BY_MONTH, 
    MONTHS_ORDER, 
    type MonthlyBirthdays 
} from '../../data/birthday/birthday' 

// 2. TIPOS DE DADOS
// Tipo dos dados que vêm do BirthdayCarousel
interface BirthdayMember {
    date: string;
    name: string;
    team: string;
}

// Tipo dos dados que o UserModal espera
interface SelectedStudent {
    id: number;
    name: string;
    nameSocial: string;
    avatar: string;
    role: string;
}

export const Birthday: FC = () => {
    // 3. ESTADO PARA CONTROLAR O MODAL
    const [selectedMember, setSelectedMember] = useState<SelectedStudent | null>(null);

    const handleCloseModal = () => {
        setSelectedMember(null);
    };

    // 4. FUNÇÃO DE CLIQUE: Mapeia dados limitados do aniversariante para o formato do Modal
    const handleOpenModal = (member: BirthdayMember) => {
        
        // 🛑 NOTA IMPORTANTE:
        // O `BirthdayMember` tem apenas `date`, `name` e `team`.
        // O `UserModal` requer `id`, `nameSocial`, `avatar` e `role`.
        // Você DEVE substituir estes valores mockados pelos dados reais do seu backend.
        
        const mockData: SelectedStudent = {
            id: Math.random() * 1000, // Substituir por ID real
            name: member.name,
            nameSocial: member.name, // Usando name como nome social por enquanto
            avatar: '/path/to/default/avatar.png', // Substituir por URL real
            role: 'ANIVERSARIANTE', // Ou o papel real, se disponível
        };

        setSelectedMember(mockData);
    };
    
    return (
        <Box 
            component='div' 
            className='flex flex-col items-center p-4 w-full' 
        >
            <PageLayout 
                backPath='/home' 
                icon={<Cake size={36} className='lg:w-[50px] lg:h-[50px]' />} 
                title='ANIVERSARIANTES'
            >
                <div 
                    className='flex flex-col pb-6 lg:pb-0 gap-10 mt-10 lg:mt-14 w-full' 
                >
                    {MONTHS_ORDER.map((monthKey) => {
                        const monthData: MonthlyBirthdays | undefined = BIRTHDAYS_BY_MONTH[monthKey];

                        if (!monthData || monthData.members.length === 0) {
                            return null;
                        }
                        
                        return (
                            <BirthdayCarousel
                                key={monthKey}
                                title={monthData.title}
                                members={monthData.members}
                                onMemberClick={handleOpenModal} // 5. PASSANDO O HANDLER PARA O CARROSSEL
                            />
                        );
                    })}
                </div> 
            </PageLayout>
            
            {/* 6. RENDERIZAÇÃO DO MODAL */}
            {selectedMember && (
                <UserModal
                    isOpen={!!selectedMember}
                    onClose={handleCloseModal}
                    student={selectedMember}
                />
            )}
        </Box>
    )
}