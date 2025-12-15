import { useRef, type FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Cake, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useScrollArrows } from '../../hooks/useScrollsArrow';

interface BirthdayMember {
    date: string;
    name: string;
    team: string;
}

interface BirthdayCarouselProps {
    title?: string;
    members: BirthdayMember[];
    icon?: boolean;
}

const BirthdayCard: FC<BirthdayMember> = ({ date, name, team }) => (
    <div
        className='bg-[#880000] rounded-lg p-2 flex flex-col items-center gap-2 
                min-w-[130px] lg:min-w-[180px] border-[8px] border-[#3E0404]' 
    >
        <div className='text-center text-white'>
            <Typography variant='h5' className='!font-bold'> 
                {date}
            </Typography>
            <Typography variant='body2'>{name}</Typography> 
        </div>

        <div className='bg-white/20 rounded-full p-2 sm:p-3 text-white'>
            <User size={48} /> 
        </div>

        <span className='text-white bg-black/30 px-3 py-1 rounded-full text-xs font-semibold text-center'> 
            {team}
        </span>
    </div>
);

export const BirthdayCarousel: FC<BirthdayCarouselProps> = ({
        members, title, icon
    }) => {

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { showLeftArrow, showRightArrow, checkScroll } = useScrollArrows(scrollContainerRef);

    const handleScrollRight = () => {
        scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const handleScrollLeft = () => {
        scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

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

            {/* CONTAINER PRINCIPAL DO CARROSSEL */}
            <div className='relative flex items-center'> 
                
                {/* SETA ESQUERDA */}
                <div 
                    className={`absolute left-0 z-20 hidden md:flex items-center h-full 
                                transition-opacity duration-300 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <ChevronLeft
                        size={42}
                        className='text-white cursor-pointer bg-black/50 p-1 rounded-r-lg' 
                        onClick={handleScrollLeft}
                    />
                </div>

                {/* Cards Container: Adiciona padding para o espaço das setas */}
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className='flex overflow-x-auto gap-4 md:gap-6 lg:gap-8 pb-6 flex-1
                                px-6 md:px-10 lg:px-12 // Espaço para as setas
                                
                                [&::-webkit-scrollbar]:h-2
                                [&::-webkit-scrollbar-thumb]:bg-[#880000]
                                [&::-webkit-scrollbar-track]:bg-[#3E0404]
                                [&::-webkit-scrollbar-thumb]:rounded-full'
                >
                    {members.map((member) => (
                        <BirthdayCard
                            key={`${member.name}-${member.date}`}
                            date={member.date}
                            name={member.name}
                            team={member.team}
                        />
                    ))}
                </div>

                {/* SETA DIREITA */}
                <div 
                    className={`absolute right-0 z-20 hidden md:flex items-center h-full 
                                transition-opacity duration-300 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <ChevronRight
                        size={42}
                        className='text-white cursor-pointer bg-black/50 p-1 rounded-l-lg' 
                        onClick={handleScrollRight}
                    />
                </div>
            </div>
        </Box>
    );
};