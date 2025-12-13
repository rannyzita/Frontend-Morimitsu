import React from 'react';
import { CustomCheckbox } from '../../CheckBox/checkBox';

interface ActionButtonProps {
    leftIcon?: React.ReactNode;          
    title: React.ReactNode;              
    rightIcon?: React.ReactNode;         
    showCheckbox?: boolean;              
    checkboxChecked?: boolean;           
    onCheckboxChange?: () => void;       
    onClick?: () => void;                
    className?: string;                  
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
            <div className='flex-1 text-center leading-tight text-[8px] md:text-[12px]'>
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
                <CustomCheckbox
                    checked={checkboxChecked}
                    onChange={onCheckboxChange}
                />
            )}
        </button>
    );
};
