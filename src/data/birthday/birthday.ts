interface BirthdayMember {
    date: string;
    name: string;
    team: string;
    // Adicionaria avatarUrl aqui se o BirthdayCard usasse imagens reais, n vou por agr
}

export interface MonthlyBirthdays {
    title: string;
    members: BirthdayMember[];
}

export const BIRTHDAYS_BY_MONTH: Record<string, MonthlyBirthdays> = {
    JANEIRO: {
        title: 'JANEIRO',
        members: [
            { date: '05/01', name: 'Lucas Silva', team: 'TURMA MISTA' },
            { date: '18/01', name: 'Pedro Santos', team: 'TURMA ADULTA' },
            { date: '25/01', name: 'Mariana Lima', team: 'TURMA KIDS' },
        ],
    },
    FEVEREIRO: {
        title: 'FEVEREIRO',
        members: [
            { date: '10/02', name: 'Felipe Costa', team: 'TURMA MISTA' },
            { date: '20/02', name: 'Isabela Alves', team: 'TURMA ADULTA' },
            { date: '21/02', name: 'Alex Alves', team: 'TURMA ADULTA' },
        ],
    },
    MARCO: {
        title: 'MARÇO',
        members: [
            { date: '10/03', name: 'Felipe Costa', team: 'TURMA MISTA' },
        ],
    },

    ABRIL: {
        title: 'ABRIL',
        members: [
            { date: '10/04', name: 'Felipe Costa', team: 'TURMA MISTA' },
        ],
    },

    MAIO: {
        title: 'MAIO',
        members: [
            { date: '10/05', name: 'Felipe Costa', team: 'TURMA MISTA' },
        ],
    },  

    JUNHO: {
        title: 'JUNHO',
        members: [
            { date: '10/06', name: 'Felipe Costa', team: 'TURMA MISTA' },
        ],
    },

    JULHO: {
        title: 'JULHO',
        members: [
            { date: '10/07', name: 'Felipe Costa', team: 'TURMA MISTA' },
        ],
    },

    AGOSTO: {
        title: 'AGOSTO',
        members: [
            { date: '10/08', name: 'Felipe Costa', team: 'TURMA MISTA' },
        ],
    },

    SETEMBRO: {
        title: 'SETEMBRO',
        members: [
            { date: '10/09', name: 'Felipe Costa', team: 'TURMA MISTA' },
        ],
    },

    OUTUBRO: {
        title: 'OUTUBRO',
        members: [
            { date: '10/10', name: 'Antônio Henrique', team: 'TURMA MISTA' },
            { date: '22/10', name: 'Anna Cristina', team: 'TURMA ADULTA' },
            { date: '22/10', name: 'Jullianna Souza', team: 'TURMA KIDS' },
            { date: '29/10', name: 'Enzo Alves', team: 'TURMA KIDS' },
        ],
    },
    NOVEMBRO: {
        title: 'NOVEMBRO',
        members: [
            { date: '10/11', name: 'Antônio Henrique', team: 'TURMA MISTA' },
            { date: '22/11', name: 'Anna Cristina', team: 'TURMA ADULTA' },
            { date: '22/11', name: 'Jullianna Souza', team: 'TURMA KIDS' },
            { date: '29/11', name: 'Enzo Alves', team: 'TURMA KIDS' },
        ],
    },
    DEZEMBRO: {
        title: 'DEZEMBRO',
        members: [
            { date: '10/12', name: 'Antônio Henrique', team: 'TURMA MISTA' },
            { date: '22/12', name: 'Anna Cristina', team: 'TURMA ADULTA' },
            { date: '22/12', name: 'Jullianna Souza', team: 'TURMA KIDS' },
            { date: '29/12', name: 'Enzo Alves', team: 'TURMA KIDS' },
        ],
    },
};

export const MONTHS_ORDER = ['JANEIRO', 'FEVEREIRO', 'MARCO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];