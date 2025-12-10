import { ClassListPage } from '../classManagement/components/classList';
import { ListChecks } from 'lucide-react'

import turmaBaby from '../classManagement/options/assetsTest/IconBaby.png';
import turmaInfantil from '../classManagement/options/assetsTest/TurmaInfantil.png';
import turmaMista from '../classManagement/options/assetsTest/iconMista.png';

export const ReadClassFrequency = () => (
    <ClassListPage
        title='REALIZAR A FREQUÊNCIA'
        icon={<ListChecks className='w-10 h-10 md:w-25 md:h-25' />}
        items={[
            { id: 1, label: 'TURMA BABY', icon: turmaBaby },
            { id: 2, label: 'TURMA INFANTIL', icon: turmaInfantil },
            { id: 3, label: 'TURMA MISTA', icon: turmaMista },
        ]}
        basePath='/gerenciamento-turmas/frequencia'
        message='SELECIONE A TURMA QUE DESEJA REALIZAR A FREQUÊNCIA:'
    />
);