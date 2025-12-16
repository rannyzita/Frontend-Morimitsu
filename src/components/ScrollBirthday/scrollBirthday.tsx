import { useRef, type FC, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Cake, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollArrows } from '../../hooks/useScrollsArrow';

import type { Aniversariante } from '../../services/home/types/types';

export type BirthdayMember = Aniversariante;

interface BirthdayCardProps extends BirthdayMember {
    onCardClick: (member: BirthdayMember) => void;
}

const BirthdayCard: FC<BirthdayCardProps> = ({
    nome,
    aniversario,
    turma,
    fotoPerfil,
    isToday,
    onCardClick
}) => {
    const imageUrl = fotoPerfil
        ? fotoPerfil.startsWith('http')
            ? fotoPerfil
            : `${import.meta.env.VITE_API_URL}${fotoPerfil}`
        : '/IconProfile.png';

    return (
        <div
            onClick={() =>
                onCardClick({
                    nome,
                    aniversario,
                    turma,
                    fotoPerfil,
                    isToday
                })
            }
            className={`
                rounded-lg p-2 flex flex-col items-center gap-2
                min-w-[130px] md:min-w-[160px] lg:min-w-[180px]
                border-[8px]
                cursor-pointer transition-transform
                hover:scale-[1.03] active:scale-[0.98]
                ${
                    isToday
                        ? 'bg-[#880000] border-yellow-400 ring-2 ring-yellow-300'
                        : 'bg-[#880000] border-[#3E0404]'
                }
            `}
        >
            {/* DATA */}
            <div className='text-center text-white'>
                <Typography variant='h5' className='!font-bold'>
                    {aniversario}
                </Typography>
                <Typography variant='body2'>{nome}</Typography>
            </div>

            {/* FOTO */}
            <img
                src={imageUrl}
                alt={nome}
                onError={(e) => {
                    e.currentTarget.src = '/IconProfile.png';
                }}
                className='
                    w-16 h-16 md:w-14 md:h-14 lg:w-20 lg:h-20
                    rounded-full object-cover
                    border-2 border-white/70
                '
            />

            {/* TURMA */}
            <span className='
                text-white bg-black/30 px-3 py-1 rounded-full
                text-xs md:text-[12px] font-semibold text-center
            '>
                {turma}
            </span>

            {/* HOJE */}
            {isToday && (
                <span className='text-yellow-300 text-xs font-bold mt-1'>
                    🎂 HOJE
                </span>
            )}
        </div>
    );
};

interface BirthdayCarouselProps {
    title?: string;
    members: BirthdayMember[];
    icon?: boolean;
    onMemberClick: (member: BirthdayMember) => void;
}

export const BirthdayCarousel: FC<BirthdayCarouselProps> = ({
    members,
    title,
    icon,
    onMemberClick
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { showLeftArrow, showRightArrow, checkScroll } =
        useScrollArrows(scrollContainerRef);

    const handleScrollRight = () => {
        scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const handleScrollLeft = () => {
        scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

    useEffect(() => {
        requestAnimationFrame(checkScroll);

        const handleResize = () => {
            requestAnimationFrame(checkScroll);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [checkScroll, members]);

    return (
        <Box component='section' className='pb-4'>
            <header className='flex items-center gap-3 lg:gap-4 mb-6'>
                {icon && (
                    <Cake className='text-white w-12 h-12 lg:w-[68px] lg:h-[68px]' />
                )}
                <Typography
                    variant='h6'
                    className='text-white !font-bold !text-[18px] lg:!text-4xl'
                >
                    {title}
                </Typography>
            </header>

            <div className='flex items-center relative'>
                {/* SETA ESQUERDA */}
                <div
                    className={`hidden sm:flex transition-opacity duration-300 ${
                        showLeftArrow
                            ? 'opacity-100'
                            : 'opacity-0 pointer-events-none'
                    }`}
                >
                    <ChevronLeft
                        size={48}
                        className='text-white cursor-pointer'
                        onClick={handleScrollLeft}
                    />
                </div>

                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className='
                        flex overflow-x-auto gap-4 md:gap-6 lg:gap-10
                        pb-6 flex-1 px-4 md:px-6 lg:px-8
                        [&::-webkit-scrollbar]:h-2
                        [&::-webkit-scrollbar-thumb]:bg-[#880000]
                        [&::-webkit-scrollbar-track]:bg-[#3E0404]
                        [&::-webkit-scrollbar-thumb]:rounded-full
                    '
                >
                    {members.map((member) => (
                        <BirthdayCard
                            key={`${member.nome}-${member.aniversario}-${member.turma}`}
                            {...member}
                            onCardClick={onMemberClick}
                        />
                    ))}
                </div>

                <div
                    className={`hidden sm:flex transition-opacity duration-300 ${
                        showRightArrow
                            ? 'opacity-100'
                            : 'opacity-0 pointer-events-none'
                    }`}
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
