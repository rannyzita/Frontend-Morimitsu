import type { PopUpData } from '../../../../components/layout/typePopUp/type';

export const classPopUp: PopUpData = {
    title: 'GUIA DO GERECIAMENTO DE TURMAS',

    description:
    'Esta tela é o seu painel de controle principal para a logística de todas as aulas e gerenciamento das turmas. Ao clicar em cada botão desta página, você vai ter essas seguintes funções:',

    items: [
        {
            id: 'Ver',
            title: '1. Ver Turmas',
            content: (
                <div className='p-3text-white/90 text-justify text-[10px] md:text-[12px] m-4'>
                    <ul className='list-disc list-inside space-y-2 mb-4'>
                        <p>Exibe uma lista com todas as turmas, professores responsáveis por cada turma e os alunos que estão naquela determinada turma.</p>

                        <p className='font-bold mt-8'>Na página irá ter: </p>
                        <li>Página responsável para ver todas as turmas existentes do sistema, ao clicar em alguma delas, irá aparecer todos os dados daquela turma.</li>
                    </ul>
                </div>
            )
        },

        {
            id: 'Criar',
            title: '2. Criar Turmas',
            content: (
                <div className='p-3text-white/90 text-justify text-[10px] md:text-[12px] m-4'>
                    <ul className='list-disc list-inside space-y-2 mb-4'>
                        <p>Permite adicionar uma nova turma colocando a idade minima, máxima e o responsável por aquela determinada turma.</p>
                    </ul>
                </div>
            )
        },

        {
            id: 'Editar',
            title: '3. Editar Turmas',
            content: (
                <div className='p-3text-white/90 text-justify text-[10px] md:text-[12px] m-4'>
                    <ul className='list-disc list-inside space-y-2 mb-4'>
                        <p>Dá a você a capacidade de mudar os detalhes de uma turma existente, como o professor, idade minima ou máxima.</p>
                    </ul>
                </div>
            )
        },

        {
            id: 'Excluir',
            title: '4. Excluir Turmas',
            content: (
                <div className='p-3text-white/90 text-justify text-[10px] md:text-[12px] m-4'>
                    <ul className='list-disc list-inside space-y-2 mb-4'>
                        <p>Remove uma turma do sistema de gerenciamento. Lembrando que ao realizar essa determinada ação extremamente sensível, irá retirar a turma de todos os alunos e eles ficarão sem a mesma vinculada.</p>
                    </ul>
                </div>
            )
        },

        {
            id: 'Enturmar',
            title: '5. Enturmar Aluno',
            content: (
                <div className='p-3text-white/90 text-justify text-[10px] md:text-[12px] m-4'>
                    <ul className='list-disc list-inside space-y-2 mb-4'>
                        <p>Permite matricular um aluno em uma ou mais turmas disponíveis e ao clicar em cada campo de determinado aluno, poder ver os detalhes do mesmo.</p>
                    </ul>
                </div>
            )
        },

        {
            id: 'Desenturmar',
            title: '6. Desenturmar Aluno',
            content: (
                <div className='p-3text-white/90 text-justify text-[10px] md:text-[12px] m-4'>
                    <ul className='list-disc list-inside space-y-2 mb-4'>
                        <p>O processo de desenturmar aluno permite remover um aluno previamente matriculado de uma ou mais turmas. É a ação inversa à "Enturmar Aluno".</p>
                    </ul>
                </div>
            )
        },

        {
            id: 'Frequência',
            title: '7. Realizar Frequência',
            content: (
                <div className='p-3text-white/90 text-justify text-[10px] md:text-[12px] m-4'>
                    <ul className='list-disc list-inside space-y-2 mb-4'>
                        <p> Mostra as turmas disponíveis para realizar a frequência e o módulo de marcação de presença, permitindo registrar quem compareceu à aula.</p>
                    </ul>
                </div>
            )
        },
    ]
}