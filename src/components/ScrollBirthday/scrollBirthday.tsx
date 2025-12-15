import { useRef, type FC, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Cake, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useScrollArrows } from '../../hooks/useScrollsArrow';

interface BirthdayMember {
    date: string;
    name: string;
    team: string;
    // NOTA: Se os dados de `id`, `avatar` ou `role` vierem da fonte de dados
    // BIRTHDAYS_BY_MONTH, adicione-os aqui. Caso contrário, serão mockados no Birthday.
}

// 1. NOVO: Interface para o Card aceitar a função de clique
interface BirthdayCardProps extends BirthdayMember {
    onCardClick: (member: BirthdayMember) => void;
}

// 2. NOVO: O BirthdayCard agora é clicável e chama onCardClick
const BirthdayCard: FC<BirthdayCardProps> = ({ date, name, team, onCardClick }) => (
    <div
        className='bg-[#880000] rounded-lg p-2 flex flex-col items-center lg:gap-2 
                min-w-[130px] md:min-w-[160px] lg:min-w-[180px] border-[8px] border-[#3E0404]
                cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.98]' // ADICIONADO ESTILO CLICÁVEL
        onClick={() => onCardClick({ date, name, team })} // DISPARA O EVENTO COM OS DADOS
    >
        <div className='text-center text-white'>
            <Typography variant='h5' className='!font-bold'> 
                {date}
            </Typography>
            <Typography variant='body2'>{name}</Typography> 
        </div>

        <div className='bg-white/20 rounded-full p-2 sm:p-3 text-white md:mt-2'>
            <User size={48} className='md:size-8 lg:size-14'/> 
        </div>

        <span className='text-white bg-black/30 px-3 py-1 rounded-full text-xs md:text-[12px] font-semibold text-center md:mt-3'> 
            {team}
        </span>
    </div>
);


// 3. NOVO: Interface para o Carousel aceitar o handler do pai
interface BirthdayCarouselProps {
    title?: string;
    members: BirthdayMember[];
    icon?: boolean;
    onMemberClick: (member: BirthdayMember) => void; // <-- NOVO PROP
}

export const BirthdayCarousel: FC<BirthdayCarouselProps> = ({
        members, title, icon, onMemberClick // <-- RECEBE O NOVO PROP
    }) => {

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { showLeftArrow, showRightArrow, checkScroll } = useScrollArrows(scrollContainerRef);

    const handleScrollRight = () => {
        scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const handleScrollLeft = () => {
        scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

    useEffect(() => {
        const raf = requestAnimationFrame(() => {
            checkScroll();
        });

        const handleResize = () => {
            requestAnimationFrame(() => checkScroll());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', handleResize);
        };
    }, [checkScroll, members]);

    return (
        <Box component='section' className='pb-4'>
            <header className='flex items-center gap-3 lg:gap-4 mb-6'>
                {icon  && (
                    <Cake className='text-white flex-shrink-0 w-12 h-12 lg:w-[68px] lg:h-[68px]' />
                )}
                <Typography variant='h6' className='text-white !font-bold !text-[18px] lg:!text-4xl'>
                    {title}
                </Typography>
            </header>

            <div className='flex items-center relative'>

                {/* SETA ESQUERDA */}
                <div
                    className={`hidden sm:flex items-center flex-shrink-0 transition-opacity duration-300
                    ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <ChevronLeft
                        size={48}
                        className='text-white cursor-pointer'
                        onClick={handleScrollLeft}
                    />
                </div>

                {/* ÁREA ROLÁVEL (APENAS OS CARDS) */}
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className='
                        flex overflow-x-auto gap-4 md:gap-6 lg:gap-10
                        pb-6 flex-1
                        px-4 md:px-6 lg:px-8

                        [&::-webkit-scrollbar]:h-2
                        [&::-webkit-scrollbar-thumb]:bg-[#880000]
                        [&::-webkit-scrollbar-track]:bg-[#3E0404]
                        [&::-webkit-scrollbar-thumb]:rounded-full
                    '
                >
                    {members.map((member) => (
                        <BirthdayCard
                            key={`${member.name}-${member.date}`}
                            {...member}
                            onCardClick={onMemberClick} // <-- REPASSA O HANDLER PARA O CARTÃO
                        />
                    ))}
                </div>

                {/* SETA DIREITA */}
                <div
                    className={`hidden sm:flex items-center flex-shrink-0 transition-opacity duration-300
                    ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <ChevronRight
                        size={48}
                        className='text-white cursor-pointer'
                        onClick={handleScrollRight}
                    />
                </div>
            </div>
        </Box>
    );
};