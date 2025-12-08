import { ClassListPage } from '../../components/classList';
import { UserPlus } from 'lucide-react'

import turmaBaby from '../assetsTest/IconBaby.png';
import turmaInfantil from '../assetsTest/TurmaInfantil.png';
import turmaMista from '../assetsTest/iconMista.png';

export const ReadAddStudent = () => (
    <ClassListPage
        title='ENTURMAR ALUNO'
        icon={<UserPlus className='w-10 h-10 md:w-25 md:h-25' />}
        items={[
            { id: 1, label: 'TURMA BABY', icon: turmaBaby },
            { id: 2, label: 'TURMA INFANTIL', icon: turmaInfantil },
            { id: 3, label: 'TURMA MISTA', icon: turmaMista },
        ]}
        basePath='/gerenciamento-turmas/enturmar-aluno'
        message='Selecione a turma que deseja enturmar o aluno(as):'
    />
);
