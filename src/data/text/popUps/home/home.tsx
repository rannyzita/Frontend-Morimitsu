import type { PopUpData } from '../../../../components/layout/typePopUp/type';

export const homePopUp: PopUpData = {
    title: "GERENCIAMENTO DE USUÁRIOS",

    description:
        "Esta tela é o seu painel de controle principal para gerenciar as contas de todas as pessoas cadastradas no sistema (alunos, professores e coordenadores).",

    items: [
        { 
            id: 'navegar', 
            title: '1. Navegação Principal (Menu Lateral)', 
            content: (
                <div className='p-3 text-sm text-white/90'>
                    <ul className='list-disc list-inside space-y-2 mb-4'>
                        <li>Exibe a lista completa de todas as contas cadastradas na academia.</li>
                    </ul>

                    <h4 className='font-semibold mb-2'>Como eu visualizo o usuário?</h4>

                    <ul className='list-disc list-inside space-y-2 ml-4'>
                        <li>Você pode pesquisar pelo campo de busca ou pela paginação.</li>
                        <li>Ao clicar no usuário ou em "ver mais", abre o modal com as informações.</li>
                    </ul>
                </div>
            )
        },

        { 
            id: 'acoes-coordenador', 
            title: '2. Criar Usuário', 
            content: <div className='p-3'>Conteúdo futuramente...</div> 
        },

        { 
            id: 'acoes-professor', 
            title: '3. Editar Usuário', 
            content: <div className='p-3'>Conteúdo futuramente...</div> 
        },
    ]
};
