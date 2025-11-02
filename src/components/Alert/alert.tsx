import { type FC, type ReactNode } from 'react';

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    children: ReactNode;
}

export const AlertModal: FC<AlertModalProps> = ({
        isOpen,
        onClose,
        onConfirm,
        title,
        children,
    }) => {
    if (!isOpen) return null;

    return (
        <div
            className='fixed inset-0 bg-black/40 backdrop-blur-[4px] flex items-center justify-center z-50'
        >
            <div className='bg-white text-black rounded-xl shadow-lg p-6 w-full max-w-xs sm:max-w-md mx-4'>
                <div className='text-center'>
                    <h2 className='text-xl font-bold mb-3 sm:text-2xl'>{title}</h2>
                    <div className='text-gray-600 text-sm mb-6'>{children}</div>
                </div>

                <div className='flex flex-row gap-8 sm:flex-row sm:justify-center sm:gap-8'>
                    <button
                        onClick={onClose}
                        className='bg-neutral-800 text-white font-semibold py-3 w-full rounded-lg hover:bg-neutral-700 transition-colors'
                    >
                        NÃO
                    </button>

                    <button
                        onClick={onConfirm}
                        className='bg-[#690808] text-white font-semibold py-3 w-full rounded-lg hover:bg-red-800 transition-colors'
                    >
                        SIM
                    </button>
                </div>
            </div>
        </div>
    );
};
