import { type FC, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCard';
import { Link } from 'react-router-dom';

interface ClassItem {
    id: number;
    label: string;
    icon: string; 
}

interface ClassListPageProps {
    title: string;
    icon: ReactNode;
    items: ClassItem[];
    basePath: string; 
    message?: string;
}

const ClassButton: FC<{ icon: ReactNode, label: string, to: string }> = ({ icon, label, to }) => (
    <Link 
        to={to}
        className='flex items-center justify-between bg-[#690808] p-4 rounded-lg 
                    font-semibold text-lg hover:bg-[rgb(170,0,0)] transition-colors
                    w-full lg:w-150 shadow-[0_5px_15px_rgba(0,0,0,0.4)]'
    >
        <div className='flex items-center justify-center w-8 h-8'>
            {icon}
        </div>

        <span className='text-center text-[12px] md:text-lg lg:text-xl flex-1'>
            {label}
        </span>

        <div className='w-8 h-8' />
    </Link>
);

export const ClassListPage: FC<ClassListPageProps> = ({ 
    title, 
    icon, 
    items, 
    basePath,
    message
}) => {

    return (
        <Box component='div' className='flex flex-col items-center justify-center h-full p-4'>
            <PageLayout title={title} icon={icon}>
                <div className='max-w-5xl mx-auto pb-24'>
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-6 items-center w-full pt-20 lg:pt-24'>
                            <p className='text-[12px] md:text-2xl'>{message}</p>
                            {items.map(item => (
                                <ClassButton
                                    key={item.id}
                                    to={`${basePath}/${item.id}`}
                                    label={item.label}
                                    icon={<img src={item.icon} className='w-8 h-8' />}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </PageLayout>
        </Box>
    );
};
