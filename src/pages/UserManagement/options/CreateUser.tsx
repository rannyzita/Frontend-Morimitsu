import { useState, type FC } from 'react';
import { Box } from '@mui/material';
import { PageLayout } from '../../../components/layout/BigCardGray_';
import { FeedbackToast } from '../../../components/Feedback/Feedback';
import { FormField } from '../../../components/formField/formField';
import { UserPlus, CircleAlert } from 'lucide-react';

interface GenderRadioProps {
    label: string;
    value: string;
    isChecked: boolean;
    onChange: (value: string) => void;
}

const GenderRadio: FC<GenderRadioProps> = ({ label, value, isChecked, onChange }) => {
    const radioId = `gender-radio-${value}`;
    return (
        <label htmlFor={radioId} className='flex items-center gap-3 text-white cursor-pointer'>
            <div className='relative w-5 h-5'>
                <input
                    type='radio'
                    id={radioId}
                    name='gender'
                    value={value}
                    checked={isChecked}
                    onChange={() => onChange(value)}
                    className='peer absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                />
                <div className='w-5 h-5 rounded-full border-2 border-neutral-700 bg-transparent transition-colors duration-150
                                peer-checked:bg-neutral-700 peer-checked:border-neutral-600 cursor-pointer'>
                </div>
            </div>
            <span>{label}</span>
        </label>
    );
};

export const CreateUsuario: FC = () => {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cargo, setCargo] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [faixa, setFaixa] = useState('');
    const [grau, setGrau] = useState('');
    const [genero, setGenero] = useState('F');
    const [telefoneResponsavel, setTelefoneResponsavel] = useState('');
    const [matricula, setMatricula] = useState('');
    const [turma, setTurma] = useState('');
    const [aulas, setAulas] = useState('');
    const [campoSocial, setCampoSocial] = useState('');

    const [feedback, setFeedback] = useState<{
        visible: boolean;
        message: string;
        type: 'success' | 'error';
    }>({ visible: false, message: '', type: 'success' });

    const handleCreateClick = () => {
        setFeedback({
            visible: true,
            message: 'Usuário criado com sucesso!',
            type: 'success',
        });
    };

    const RequiredLabel: FC<{ label: string }> = ({ label }) => (
        <div className='flex items-center gap-2 h-7'>
            <CircleAlert size={22} className='text-gray-400' />
            <span>{label}</span>
        </div>
    );

    const StandardLabel: FC<{ label: string }> = ({ label }) => (
        <div className='h-7 flex items-center'>
            <span>{label}</span>
        </div>
    );

    return (
        <Box component='div' className='flex flex-col items-center justify-center h-full p-4'>
            <PageLayout
                title='CRIAR USUÁRIO'
                icon={<UserPlus className='w-8 h-8 lg:w-12 lg:h-10 text-white' />}
            >
                <div className='flex flex-col justify-center min-h-[65vh] gap-8 px-4 md:gap-12 md:px-16'>

                    {/* GRID DE CAMPOS */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-4 md:gap-y-6 items-end mt-4'>

                        {/* Campos obrigatórios */}
                        <FormField label={<RequiredLabel label='Nome completo:' />} value={nomeCompleto} onChange={setNomeCompleto} />
                        <FormField label={<StandardLabel label='Nome Social:' />} value={campoSocial} onChange={setCampoSocial} />
                        <FormField label={<RequiredLabel label='Data de nascimento:' />} type='date' value={dataNascimento} onChange={setDataNascimento} />
                        <FormField label={<RequiredLabel label='Cargo:' />} value={cargo} onChange={setCargo} isSelect={true} />
                        <FormField label={<RequiredLabel label='Endereço:' />} value={endereco} onChange={setEndereco} />

                        {/* Campo de gênero */}
                        <div className='flex flex-col gap-2'>
                            <label className='flex items-center gap-2 h-7 text-gray-400'>
                                <CircleAlert size={22} className='text-gray-400' />
                                <span>Gênero:</span>
                            </label>
                            <div className='flex gap-4 pt-3'>
                                <GenderRadio label='Feminino' value='F' isChecked={genero === 'F'} onChange={setGenero} />
                                <GenderRadio label='Masculino' value='M' isChecked={genero === 'M'} onChange={setGenero} />
                                <GenderRadio label='Outro' value='O' isChecked={genero === 'O'} onChange={setGenero} />
                            </div>
                        </div>

                        <FormField label={<RequiredLabel label='Telefone:' />} value={telefone} onChange={setTelefone} />
                        <FormField label={<RequiredLabel label='CPF:' />} value={cpf} onChange={setCpf} />
                        <FormField label={<RequiredLabel label='Faixa:' />} value={faixa} onChange={setFaixa} isSelect={true} />
                        <FormField label={<RequiredLabel label='Grau:' />} value={grau} onChange={setGrau} isSelect={true} />

                        {/* Campos opcionais */}
                        <FormField label={<StandardLabel label='Telefone Responsável:' />} value={telefoneResponsavel} onChange={setTelefoneResponsavel} />
                        <FormField label={<StandardLabel label='Matrícula:' />} value={matricula} onChange={setMatricula} />
                        <FormField label={<StandardLabel label='Turma:' />} value={turma} onChange={setTurma} isSelect={true} />
                        <FormField label={<StandardLabel label='Aulas:' />} value={aulas} onChange={setAulas} />
                    </div>

                    {/* BOTÃO - logo abaixo dos campos, mantendo mais para baixo */}
                    <div className='flex justify-center'>
                        <button
                        onClick={handleCreateClick}
                        className='bg-[#690808] text-white font-semibold w-full max-w-sm py-4 px-4 rounded-lg
                                    hover:bg-red-800 transition-colors shadow-[0_5px_15px_rgba(0,0,0,0.3)]
                                    md:w-auto md:max-w-none md:py-3 md:px-50'
                        >
                            Criar
                        </button>
                    </div>
                </div>
            </PageLayout>

            {/* FEEDBACK */}
            {feedback.visible && (
                <FeedbackToast
                    message={feedback.message}
                    type={feedback.type}
                    onClose={() => setFeedback({ ...feedback, visible: false })}
                />
            )}
        </Box>
    );
};
