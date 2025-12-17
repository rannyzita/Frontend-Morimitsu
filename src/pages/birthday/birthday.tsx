import { type FC, useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCard';
import { Cake } from 'lucide-react';
import { BirthdayCarousel } from '../../components/ScrollBirthday/scrollBirthday';

// 1. IMPORTANTE: Importar o tipo exato que o Carrossel usa para evitar erro de tipo
import type { Aniversariante as CarouselAniversariante } from '../../services/home/types/types';

// Importando o service e os tipos da API de aniversários
import { fetchAniversariantesAnoAtual } from '../../services/aniversarios/aniversarios';
import type { AniversariantesResponse } from '../../services/aniversarios/types/types';

const MONTH_NAMES: Record<string, string> = {
    "1": "JANEIRO", "2": "FEVEREIRO", "3": "MARÇO", "4": "ABRIL",
    "5": "MAIO", "6": "JUNHO", "7": "JULHO", "8": "AGOSTO",
    "9": "SETEMBRO", "10": "OUTUBRO", "11": "NOVEMBRO", "12": "DEZEMBRO"
};

const MONTHS_ORDER = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

export const Birthday: FC = () => {
    const [dadosAniversarios, setDadosAniversarios] = useState<AniversariantesResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const loadBirthdays = async () => {
            try {
                setLoading(true);
                const data = await fetchAniversariantesAnoAtual(token);
                setDadosAniversarios(data);
            } catch (error) {
                console.error("Erro ao carregar aniversariantes:", error);
            } finally {
                setLoading(false);
            }
        };
        loadBirthdays();
    }, [token]);

    // Função para adaptar o membro da API para o membro que o Carrossel entende
    const handleOpenModal = (member: CarouselAniversariante) => {
        console.log("Membro clicado:", member);
    };

    return (
        <Box component='div' className='flex flex-col items-center p-4 w-full'>
            <PageLayout 
                backPath='/home' 
                icon={<Cake size={36} className='lg:w-[50px] lg:h-[50px]' />} 
                title='ANIVERSARIANTES'
            >
                <div className='flex flex-col pb-6 lg:pb-0 gap-10 mt-10 lg:mt-14 w-full'>
                    
                    {loading ? (
                        <Box className="flex justify-center py-20">
                            <CircularProgress sx={{ color: '#880000' }} />
                        </Box>
                    ) : (
                        MONTHS_ORDER.map((monthKey) => {
                            const apiMembers = dadosAniversarios?.meses[monthKey] || [];
                            const monthTitle = MONTH_NAMES[monthKey];

                            // 2. ADAPTAÇÃO: Mapeia os dados da API para o que o Carrossel pede
                            // Adicionamos os campos faltantes: id, nome_social, imagem_perfil_url, isToday
                            const formattedMembers: CarouselAniversariante[] = apiMembers.map((m, index) => ({
                                ...m,
                                id: (m as any).id || index.toString(), // Garante um ID
                                nome_social: m.nome,
                                imagem_perfil_url: m.fotoPerfil,
                                isToday: m.aniversario === new Date().toLocaleDateString('pt-BR').slice(0, 5) 
                            }));

                            return (
                                <Box key={monthKey} className="w-full">
                                    {formattedMembers.length > 0 ? (
                                        <BirthdayCarousel
                                            title={monthTitle}
                                            members={formattedMembers}
                                            onMemberClick={handleOpenModal}
                                        />
                                    ) : (
                                        <Box className="pb-10">
                                            <Typography
                                                variant='h6'
                                                className='text-white !font-bold !text-[18px] lg:!text-4xl mb-4 opacity-50'
                                            >
                                                {monthTitle}
                                            </Typography>
                                            <Typography className="text-white/60 italic text-sm lg:text-base ml-2">
                                                Nenhum aniversariante desse mês
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            );
                        })
                    )}
                </div> 
            </PageLayout>
        </Box>
    );
};