import type { PopUpData } from '../../../../components/layout/typePopUp/type';

export const homePopUp: PopUpData = {
    title: 'GUIA DA HOME',

    description:
        'Este guia explica como navegar e usar as ferramentas disponíveis na tela inicial, que são adaptadas ao seu nível de acesso. O sistema é organizado para simplificar a gestão e o acompanhamento dos alunos de Jiu-jitsu.',

    items: [
        { 
            id: 'navegar', 
            title: '1. Navegação Principal (Menu Lateral)', 
            content: (
                <div className='p-3text-white/90 text-justify text-[10px] md:text-[12px] m-4'>
                    <ul className='list-disc list-inside space-y-2 mb-4'>
                        <p>O menu lateral (Sidebar) é a chave de acesso a todas as funcionalidades do sistema.</p>
                        <h4 className='font-semibold mb-2'>Como abrir?</h4>
                        <li className='ml-4'>Para acessar, clique no ícone de três linhas horizontais localizado no canto superior esquerdo da tela.</li>
                    </ul>

                    <h4 className='font-semibold mb-2'>Visão Geral da Sidebar:</h4>

                    <ul className='list-disc list-inside space-y-2 ml-4'>
                        <li><span className='font-bold underline'>Coordenador:</span> Possui acesso completo e funções de gerenciamento, incluindo: Usuários (gestão de contas), Turmas (gestão de horários e na realização de frequência), Graduação e Relatórios completos e meu Perfil (Que você pode editar sua conta e sair também do sistema).</li>
                        <li><span className='font-bold underline'>Professor:</span> Possui acesso focado na operação diária, incluindo: Frequência e Relatório específicos de suas turmas e meu Perfil (Que você pode editar sua conta e sair também do sistema).</li>
                    </ul>
                </div>
            )
        },

        { 
            id: 'acoes-coordenador', 
            title: '2. Ações Centrais e Notificações (Home - Coordenador)', 
            content: (
                <div className='p-3text-white/90 text-justify text-[10px] md:text-[12px] m-4'>
                    <ul className='list-disc list-inside space-y-2 mb-4'>
                        <p>A tela inicial do Coordenador é focada na gestão e na tomada de decisão, através de dois botões principais (Turmas e Graduação) e uma caixa de alerta que notifica ao coordenador quando o aluno está próximo ou apto a se graduar.</p>
                    </ul>
                </div>
            )
        },

        { 
            id: 'acoes-professor', 
            title: '3 - Ações Centrais (Home - Professor)', 
            content: (
                <div className='p-3text-white/90 text-justify text-[10px] md:text-[12px] m-4'>
                    <ul className='list-disc list-inside space-y-2 mb-4'>
                        <p>A tela inicial do Professor é simplificada e focada nas tarefas essenciais de sala de aula, acessíveis via sidebar (os três tracinhos localizados no canto superior dá página).</p>
                    </ul>
                </div>
            )
        },
    ]
};
