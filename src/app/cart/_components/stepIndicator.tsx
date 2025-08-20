// app/cart/_components/StepIndicator.tsx
'use client';

interface StepIndicatorProps {
    step: number;
    active: boolean;
    text: string;
}

export default function StepIndicator({ step, active, text }: StepIndicatorProps) {
    return (
        <div
            className={`flex items-center space-x-2 cursor-pointer transition-opacity ${
                active ? '' : 'opacity-50 hover:opacity-75'
            }`}
        >
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    active
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                }`}
            >
                {step}
            </div>
            <span className={`text-sm font-medium ${active ? 'text-green-600' : 'text-gray-500'}`}>
                {text}
            </span>
        </div>
    );
}
