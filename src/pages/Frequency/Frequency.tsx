import { type FC, useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, Divider, Avatar, Checkbox, IconButton, Button } from '@mui/material';
import { PageLayout } from '../../components/layout/BigCard';
import { ListChecks, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { ptBR }  from 'date-fns/locale/pt-BR';
import { FeedbackToast } from '../../components/Feedback/Feedback';
interface RankedStudent {
    id: number;
    name: string;
    avatarUrl: string;
}

const STUDENTS = [
    { id: 1, name: 'Mariana dos Santos', avatar: '/avatar1.png' },
    { id: 2, name: 'Carlos Eduardo da Silva', avatar: '/avatar2.png' },
    { id: 3, name: 'Arthur Pereira Santos', avatar: '/avatar3.png' },
    { id: 4, name: 'Mary Jubiscreuda Felintro', avatar: '/avatar4.png' },
    { id: 5, name: 'Pedro Carlos', avatar: '/avatar5.png' },
    { id: 6, name: 'Anna Julia de Félix Souza', avatar: '/avatar6.png' },
    { id: 7, name: 'Anna Julia de Félix Souza', avatar: '/avatar6.png' },
    { id: 8, name: 'Anna Julia de Félix Souza', avatar: '/avatar6.png' },
    { id: 9, name: 'Anna Julia de Félix Souza', avatar: '/avatar6.png' },
];

export const Frequency: FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());

    const [selected, setSelected] = useState<number[]>([]);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(5);

    const totalPages = Math.ceil(STUDENTS.length / perPage);

    const navigate = useNavigate();

    const handleNavigateToFrequency = () => {
        navigate('/gerenciamento-turmas/aulas-alunos')
    }

    useEffect(() => {
        const update = () => {
            if (window.innerWidth < 600) setPerPage(4);
            else setPerPage(5);

            if (window.innerHeight > 700) setPerPage(8);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const pageStudents = STUDENTS.slice(page * perPage, page * perPage + perPage);

    const toggle = (id: number) => {
        setSelected(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const handleRegisterFrequency = () => {

        setToast({
            message: 'Frequência registrada com sucesso!',
            type: 'success',
        });
    };

    const podiumData = {
        first: 'ANA LAURA',
        second: 'JOÃO LUCAS',
        third: 'NICHOLAS ALVES',
    };

    const rankedStudents: RankedStudent[] = [
        { id: 1, name: 'ANA LAURA', avatarUrl: '/avatar1.png' },
        { id: 2, name: 'JOÃO LUCAS', avatarUrl: '/avatar2.png' },
        { id: 3, name: 'NICHOLAS ALVES', avatarUrl: '/avatar3.png' },
    ];

    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <Box className='flex flex-col items-center justify-center h-full p-4'>
                <PageLayout
                    icon={<ListChecks size={36} className='lg:w-[50px] lg:h-[50px]' />}
                    title='REALIZAR A FREQUÊNCIA'
                >

                    <Grid container spacing={8} className='mt-4 md:pt-4 lg:pt-0'>
                        <Grid item xs={12} lg={8}>
                            <div className='bg-[#7a0a0a] rounded-lg px-4 py-2 flex items-center text-center justify-center gap-3 mb-2 mt-4 md:mt-0 lg:mt-0'>
                                <Avatar src='/turmaIcon.png' />
                                <Typography className='!font-bold text-white text-lg'>
                                    TURMA INFANTIL
                                </Typography>
                            </div>

                            {/* ---------- COLUNA ESQUERDA ---------- */}
                            <Card className='
                                !bg-[#690808] text-white p-4 !rounded-[10px]
                                shadow-[0_5px_15px_rgba(0,0,0,0.4)]
                                h-[720px]
                                md:h-[600px]
                                flex flex-col
                            '>
                                <Grid container spacing={3} className='mb-2 pl-4'>
                                    <Grid item xs={12} sm={4}>
                                        <Typography className='!text-[10px] md:!text-[14px] !font-bold mb-1'>
                                            DATA DA AULA:
                                        </Typography>
                                        <DatePicker
                                            value={selectedDate}
                                            onChange={(newValue) => setSelectedDate(newValue)}
                                            format='dd/MM/yyyy'
                                            slotProps={{
                                                textField: {
                                                    size: 'small',
                                                    fullWidth: true,
                                                    className: 'bg-black rounded-lg',
                                                    InputProps: {
                                                        style: { color: 'white' },
                                                    },
                                                },
                                                actionBar: {
                                                    sx: {
                                                        '& .MuiButton-root': {
                                                            color: 'white',
                                                        },
                                                    },
                                                },
                                                popper: {
                                                    sx: {
                                                        '& .Mui-selected': {
                                                            backgroundColor: '#7a0a0a',
                                                            color: 'white',
                                                        },
                                                    },
                                                },
                                                dialog: {
                                                    sx: {
                                                        '& .MuiButton-root': {
                                                            color: 'white',
                                                        },
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <Typography className='!text-[10px] md:!text-[14px] !font-bold mb-1'>
                                            HORÁRIO DA AULA:
                                        </Typography>
                                        <TimePicker
                                            value={selectedTime}
                                            onChange={(newValue) => setSelectedTime(newValue)}
                                            ampm={false}
                                            format='HH:mm'
                                            openTo='hours'
                                            slotProps={{
                                                textField: {
                                                    size: 'small',
                                                    fullWidth: true,
                                                    className: 'bg-black rounded-lg',
                                                    InputProps: {
                                                        style: { color: 'white' },
                                                        readOnly: false,
                                                    },
                                                },
                                                actionBar: {
                                                    sx: {
                                                        '& .MuiButton-root': {
                                                            color: 'white',
                                                        },
                                                    },
                                                },
                                                popper: {
                                                    sx: {
                                                        '& .Mui-selected': {
                                                            backgroundColor: '#7a0a0a',
                                                            color: 'white',
                                                        },
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <div className='flex-1 overflow-y-auto rounded-lg p-3 space-y-2'>
                                    {pageStudents.map(student => (
                                        <div
                                            key={student.id}
                                            className='flex items-center justify-between bg-[#f5eaea] !p-1 md:!p-3 rounded-lg'
                                        >
                                            <div className='flex items-center gap-4'>
                                                <Avatar src={student.avatar} className='!w-7 !h-7 md:!w-10 md:!h-10'/>
                                                <span className='text-[#2b0505] text-[12px] md:text-[16px]'>
                                                    {student.name}
                                                </span>
                                            </div>

                                            <Checkbox
                                                checked={selected.includes(student.id)}
                                                onChange={() => toggle(student.id)}
                                                sx={{
                                                    color: '#1f1f1f',
                                                    '&.Mui-checked': { color: '#1f1f1f' },
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className='mt-auto pt-4 space-y-3'>
                                    {/* Paginação */}
                                    <div className='flex items-center justify-between text-white mt-2'>
                                        <IconButton onClick={() => setPage(p => Math.max(0, p - 1))}>
                                            <ChevronLeft color='white' />
                                        </IconButton>

                                        <span className='font-bold'>{page + 1}/{totalPages}</span>

                                        <IconButton onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}>
                                            <ChevronRight color='white' />
                                        </IconButton>
                                    </div>

                                    <div className='flex justify-end items-end mt-12 md:mt-2 ml-16 md:ml-55 lg:ml-90'>
                                        <Button
                                            variant='contained'
                                            fullWidth
                                            onClick={handleRegisterFrequency}
                                            className='!bg-[#3E0404] text-white !mt-2 md:!mt-3 !py-2 md:!py-4 rounded-lg !text-[12px] md:!text-[15px]'
                                        >
                                            REGISTRAR FREQUÊNCIA
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Grid>

                        {/* Coluna Direita (Ranking) - Mantida */}
                        <Grid item xs={12} lg={4}>
                            <Box className='lg:w-full flex flex-col items-center gap-4 bg-[#500000] border-3 border-[#3E0404] !rounded-[5px] shadow-[0_5px_15px_rgba(0,0,0,0.4)] p-4'>
                                
                                <Typography variant='h6' className='!font-semibold text-white'>RANKING</Typography>

                                <Trophy size={64} className='text-white' strokeWidth={1.5} />

                                {/* PÓDIO */}
                                <div className='w-full flex justify-center mt-6'>
                                    <div className='flex items-end text-white font-bold select-none'>

                                        {/* 2º Lugar */}
                                        <div className='bg-[#690808] w-18 h-16 flex flex-col items-center justify-center relative border-t-6 border-[#3E0404]'>
                                            <span className='absolute -top-8 text-[9px] tracking-wide'>
                                                {podiumData.second}
                                            </span>
                                            <span className='text-xl'>2º</span>
                                        </div>

                                        {/* 1º Lugar */}
                                        <div className='bg-[#690808] w-18 h-20 flex flex-col items-center justify-center relative border-t-6 border-[#3E0404]'>
                                            <span className='absolute -top-8 text-[10px] tracking-wide'>
                                                {podiumData.first}
                                            </span>
                                            <span className='text-3xl'>1º</span>
                                        </div>

                                        {/* 3º Lugar */}
                                        <div className='bg-[#690808] w-18 h-14 flex flex-col items-center justify-center relative border-t-6 border-[#3E0404]'>
                                            <span className='absolute -top-8 text-[8px] tracking-wide text-center'>
                                                {podiumData.third}
                                            </span>
                                            <span className='text-xl'>3º</span>
                                        </div>

                                    </div>
                                </div>

                                <Box className='flex flex-col gap-3 w-full mt-auto mb-4 px-3'>

                                    <Divider className='!border-[#3E0404] !border-[2px]' />

                                    <Typography className='!font-bold text-center text-white'>ALUNOS</Typography>

                                    {rankedStudents.map((student) => (
                                        <div
                                            key={student.id}
                                            className='bg-[#690808] p-2 rounded-xl flex justify-between items-center shadow-[0_5px_15px_rgba(0,0,0,0.4)]'
                                        >
                                            <div className='flex items-center gap-2'>
                                                <img src={student.avatarUrl} className='w-6 h-6 rounded-full' alt={student.name} />
                                                <span className='font-bold text-[12px]'>{student.name}</span>
                                            </div>
                                            <button className='bg-[#3E0404] px-3 py-1 rounded-md text-[10px] text-white'>
                                                Ver mais
                                            </button>
                                        </div>
                                    ))}
                                </Box>
                            </Box>

                            <div className='mt-5'>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    className='bg-[#690808] text-white mt-10 !py-4 md:!py-5 rounded-lg !font-bold !text-[12px] md:!text-[14px]'
                                    onClick={handleNavigateToFrequency}
                                >
                                    VISUALIZAR AULAS DOS ALUNOS ›
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                    
                    {toast && (
                        <FeedbackToast
                            message={toast.message}
                            type={toast.type}
                            onClose={() => setToast(null)}
                        />
                    )}
                </PageLayout>
            </Box>
        </LocalizationProvider>
    );
};