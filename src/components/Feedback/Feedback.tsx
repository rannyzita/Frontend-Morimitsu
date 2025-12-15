import { useEffect, type FC } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface FeedbackToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
    bottom?: string; 
    right?: string;
}

export const FeedbackToast: FC<FeedbackToastProps> = ({ 
    message, 
    type, 
    onClose,
    bottom = 'bottom-8',
    right = 'right-8'
}) => {
        const feedbackStyles = {
            success: {
                bgColor: 'bg-green-500',
                icon: <CheckCircle2 size={50} className='text-white' />,
            },
            error: {
                bgColor: 'bg-red-500',
                icon: <XCircle size={50} className='text-white' />,
            },
        };

        const { bgColor, icon } = feedbackStyles[type];

        useEffect(() => {
            const timer = setTimeout(() => onClose(), 3000);
            return () => clearTimeout(timer);
        }, [onClose]);

        return (
        <>
            <style>{`
                @keyframes slide-up-fade-in {
                    from {
                        transform: translateY(20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .animate-slide-up-fade-in {
                    animation: slide-up-fade-in 0.3s ease-out forwards;
                }
            `}</style>

            <div 
                className={`
                    fixed ${bottom} sm:${right} right-4
                    ${bgColor} text-white
                    p-4 sm:p-6 rounded-xl shadow-lg
                    flex items-start gap-4 sm:gap-6
                    max-w-[85vw] md:max-w-[100vw]
                    z-80 animate-slide-up-fade-in
                `}
            >
                <div className='w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0'>
                    {type === 'success' ? 
                        <CheckCircle2 className='text-white w-full h-full' /> : 
                        <XCircle className='text-white w-full h-full' />}
                </div>

                <span className='font-semibold text-[14px] md:text-xl break-words whitespace-normal md:mt-2'>
                    {message}
                </span>

                <button 
                    onClick={onClose} 
                    className='ml-auto text-white hover:bg-white/20 rounded-full p-1'
                >
                    <X size={24} className='sm:w-8 sm:h-8' />
                </button>
            </div>
        </>
    );

};