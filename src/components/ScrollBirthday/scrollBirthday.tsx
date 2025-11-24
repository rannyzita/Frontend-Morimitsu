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
        className='bg-[#880000] rounded-lg p-2 flex flex-col items-center gap-3 
                min-w-[150px] lg:min-w-[220px] border-[10px] border-[#3E0404]'
    >
        <div className='text-center text-white'>
            <Typography variant='h4' className='!font-bold'>
                {date}
            </Typography>
            <Typography variant='body1'>{name}</Typography>
        </div>

        <div className='bg-white/20 rounded-full p-4 sm:p-5 text-white'>
            <User size={64} />
        </div>

        <span className='text-white bg-black/30 px-3 py-1 rounded-full text-sm font-semibold'>
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

            <div className='relative flex items-center pl-8 lg:pr-2 ml-[-74px]'>
                {/* Setinha esquerda */}
                <div className={`pr-2 md:pr-6 md:lg:pr-8 ${showLeftArrow ? 'visible' : 'invisible'}`}>
                    <ChevronLeft
                        size={42}
                        className='text-white cursor-pointer'
                        onClick={handleScrollLeft}
                    />
                </div>

                {/* Cards */}
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className='flex overflow-x-auto gap-4 md:gap-20 lg:gap-30 pb-6 flex-1
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

                {/* Setinha direita */}
                <div className={`lg:pl-8 ${showRightArrow ? 'visible' : 'invisible'}`}>
                    <ChevronRight
                        size={42}
                        className='text-white cursor-pointer'
                        onClick={handleScrollRight}
                    />
                </div>
            </div>
        </Box>
    );
};
