import { ClassListPage } from '../../components/classList';
import seeClassIcon from '../assets/See-Class.png';

import turmaBaby from './assetsTest/IconBaby.png';
import turmaInfantil from './assetsTest/TurmaInfantil.png';
import turmaMista from './assetsTest/iconMista.png';

const turmasDaPagina = [
    { id: 1, label: 'TURMA BABY', icon: turmaBaby },
    { id: 2, label: 'TURMA INFANTIL', icon: turmaInfantil },
    { id: 3, label: 'TURMA MISTA', icon: turmaMista },
];

export const VerTurmas = () => (
    <ClassListPage
        title='VER TURMAS'
        icon={<img src={seeClassIcon} className='w-8 h-8' />}
        items={turmasDaPagina}
        basePath='/gerenciamento-turmas/ver'
    />
);

