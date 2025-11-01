// import { useState, type FC, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Box } from '@mui/material';
// import { PageLayout } from '../../../components/layout/BigCardGray';
// import { Pagination } from '../../../components/Pagination/Pagination';
// import { Award } from 'lucide-react';

// import { SearchInput } from '../../../components/SearchInput/SearchInput';

// import turmaBabyIcon from './assetsTest/IconBaby.png';
// import studentAvatar1 from './assetsTest/IconBaby.png';
// import studentAvatar2 from './assetsTest/TurmaInfantil.png';
// import studentAvatar3 from './assetsTest/iconMista.png';
// import studentAvatar4 from './assetsTest/IconBaby.png';

// const mockTurma = {
//     id: '1',
//     nome: 'TURMA BABY',
//     icone: turmaBabyIcon,
// };

// const initialAlunos = [
//     { id: 1, name: 'Antônio Henrique Pereira da Silva', avatar: studentAvatar1, current: 30, total: 40, isPromoted: false },
//     { id: 2, name: 'Anna Cristina Laurencio de Oliveira', avatar: studentAvatar2, current: 30, total: 40, isPromoted: false },
//     { id: 3, name: 'Juliana Souza da Paz', avatar: studentAvatar3, current: 30, total: 40, isPromoted: false },
//     { id: 4, name: 'Enzo Alves da Costa', avatar: studentAvatar4, current: 30, total: 40, isPromoted: false },
//     { id: 5, name: 'Beatriz Martins', avatar: studentAvatar1, current: 28, total: 40, isPromoted: false },
//     { id: 6, name: 'Carlos Eduardo Lima', avatar: studentAvatar2, current: 35, total: 40, isPromoted: false },
//     { id: 7, name: 'Daniela Ferreira', avatar: studentAvatar3, current: 22, total: 40, isPromoted: false },
//     { id: 8, name: 'Gabriel Ribeiro', avatar: studentAvatar4, current: 38, total: 40, isPromoted: false },
//     { id: 9, name: 'Helena Santos', avatar: studentAvatar1, current: 15, total: 40, isPromoted: false },
//     { id: 10, name: 'Isabela Rocha', avatar: studentAvatar2, current: 39, total: 40, isPromoted: false },
//     { id: 11, name: 'João Victor Almeida', avatar: studentAvatar3, current: 12, total: 40, isPromoted: false },
// ];

// interface StudentListItemProps {
//     avatar: string; name: string; currentClasses: number; totalClasses: number; studentId: number; isPromoted: boolean;
//     onTogglePromoted: (studentId: number, isPromoted: boolean) => void;
// }

// const StudentListItem: FC<StudentListItemProps> = ({ avatar, name, currentClasses, totalClasses, studentId, isPromoted, onTogglePromoted }) => {
//     return (
//         <div className='flex flex-col lg:flex-row lg:items-center gap-3 bg-[#690808] p-3 rounded-lg w-full max-w-lg lg:w-[950px] lg:max-w-none shadow-[0_5px_15px_rgba(0,0,0,0.3)]'>

//             <div className='flex items-center gap-3 w-full lg:w-auto'>
//                 <img src={avatar} alt={name} className='w-8 h-8 lg:w-10 lg:h-10 rounded-full flex-shrink-0' />
//                 <Award size={20} className='text-white flex-shrink-0 lg:w-6 lg:h-6' />
//                 <div className='h-8 lg:h-10 border-l border-white opacity-50 mx-1 flex-shrink-0' />
//                 <span className='flex-1 text-white font-semibold truncate text-left text-[10px] lg:text-base'>{name}</span>
//             </div>

//             <div className='flex items-center justify-between w-full lg:w-auto lg:gap-3 lg:ml-auto'>

//                 <div className='h-10 border-l border-white opacity-50 mx-1 flex-shrink-0 hidden lg:block' />

//                 <span className='text-white text-xs lg:text-sm flex-shrink-0 pl-2 lg:pl-0'>Aulas: {currentClasses}/{totalClasses}</span>

//                 <div className='relative flex flex-col items-center justify-center bg-[#3E0404] py-1 px-1 rounded w-36 flex-shrink-0 h-10'>
//                     <div className='pr-5'>
//                         <span className='block text-white text-[9px] lg:text-[10px] leading-tight text-center'>PROMOVER P/</span>
//                         <span className='block text-white text-[9px] lg:text-[10px] leading-tight text-center'>PROFESSOR(A)</span>
//                     </div>
//                     <input type='checkbox' checked={isPromoted} onChange={(e) => onTogglePromoted(studentId, e.target.checked)}
//                         className='absolute right-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 lg:w-4 lg:h-4 bg-transparent border border-white rounded-sm appearance-none checked:bg-white checked:border-transparent cursor-pointer focus:outline-none focus:ring-1 focus:ring-white'
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export const VerUsuarios: FC = () => {
//     return (
//         <Box
//             component='div'
//             className='flex flex-col items-center justify-center h-full p-4'
//         >
//             <PageLayout
//                 title={turma.nome.toUpperCase()}
//                 icon={<img src={turma.icone} alt={turma.nome} className='w-8 h-8 lg:w-10 lg:h-10' />}
//             >
//                 <div className='flex flex-col h-full gap-4 pt-8 lg:gap-6 lg:pt-8'>
//                     <SearchInput
//                         value={searchQuery}
//                         onChange={setSearchQuery}
//                         placeholder='Digite o nome do aluno'
//                         className='w-full max-w-sm mx-auto lg:w-[650px] lg:max-w-none lg:mx-auto'
//                     />

//                     <div className={`flex-1 ${mobileHeightClass} lg:min-h-[400px] flex flex-col gap-6 items-center overflow-y-auto pr-0 lg:pr-2 mt-2 lg:mt-4`}>
//                         {currentAlunos.map(aluno => (
//                             <StudentListItem
//                                 key={aluno.id}
//                                 studentId={aluno.id}
//                                 name={aluno.name}
//                                 avatar={aluno.avatar}
//                                 currentClasses={aluno.current}
//                                 totalClasses={aluno.total}
//                                 isPromoted={aluno.isPromoted}
//                                 onTogglePromoted={handleTogglePromoted}
//                             />
//                         ))}

//                         {studentsPerPage > currentAlunos.length && (
//                             <div className='flex-1'></div>
//                         )}
//                     </div>
//                     <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         onPageChange={handlePageChange}
//                     />
//                 </div>
//             </PageLayout>
//         </Box>
//     );
// }