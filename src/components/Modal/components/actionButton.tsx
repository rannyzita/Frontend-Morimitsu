import React from 'react';

interface ActionButtonProps {
    leftIcon?: React.ReactNode;          // Ícone ou imagem esquerda
    title: React.ReactNode;              // Texto (pode conter <br/>)
    rightIcon?: React.ReactNode;         // Ícone direita (quando não for checkbox)
    showCheckbox?: boolean;              // Ativar checkbox
    checkboxChecked?: boolean;           // Estado do checkbox
    onCheckboxChange?: () => void;       // Evento do checkbox
    onClick?: () => void;                // Quando clicar no botão
    className?: string;                  // Estilos extras se quiser
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    leftIcon,
    title,
    rightIcon,
    showCheckbox = false,
    checkboxChecked = false,
    onCheckboxChange,
    onClick,
    className = ''
}) => {

    return (
        <button
            onClick={onClick}
            className={`
                bg-[#690808] hover:opacity-90 text-white rounded-lg 
                pl-4 pr-4 flex pt-2 pb-2 items-center gap-2 justify-between text-[12px] 
                font-extrabold cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.4)]
                w-full
                ${className}
            `}
        >
            {/* Ícone da esquerda */}
            {leftIcon && (
                <div className='flex-shrink-0'>
                    {leftIcon}
                </div>
            )}

            {/* Título */}
            <div className='flex-1 text-center leading-tight'>
                {title}
            </div>

            {/* Ícone da direita */}
            {!showCheckbox && rightIcon && (
                <div className='flex-shrink-0'>
                    {rightIcon}
                </div>
            )}

            {/* Checkbox estilizado */}
            {showCheckbox && (
                <input
                    type='checkbox'
                    checked={checkboxChecked}
                    onChange={onCheckboxChange}
                    className='
                        appearance-none w-7 h-7 border-2 border-white rounded-md 
                        bg-transparent cursor-pointer flex-shrink-0
                        checked:bg-white checked:bg-check-mark transition-colors
                    '
                />
            )}
        </button>
    );
};
