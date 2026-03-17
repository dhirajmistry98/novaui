import { ChatStatus } from 'ai';
import { PromptInputMessage } from '../ai-elements/prompt-input';
import { motion } from 'motion/react'
import { Suggestion, Suggestions } from '../ai-elements/suggestion';
import ChatInput from './chat-input';

interface PropsType {
    input: string;
    setInput: (input: string) => void;
    onSubmit: (message: PromptInputMessage, options: any) => void;
    status: ChatStatus;
    onStop: () => void;
    isLoading: boolean;
}

const NewProjectChat = ({
    input,
    setInput,
    onSubmit,
    status,
    onStop,
    isLoading
}: PropsType) => {
    const suggestions = [
        {
            label: "Modern HR SaaS",
            value: "A clean and modern landing page for an HR and payroll platform. Use a royal blue theme with bright yellow accents for call-to-action buttons. Include a bold hero section with dashboard-style UI cards, a features grid, pricing section, testimonials, and a strong CTA above the footer."
        },
        {
            label: "AI SaaS",
            value: "A modern AI SaaS landing page with a dark theme, glowing gradients, and a clean hero section. Include a feature grid, smooth sections, and a simple pricing layout."
        },
        {
            label: "B2B SaaS",
            value: "A professional B2B SaaS website with a structured hero section, client logos, feature sections, pricing, FAQ, and a strong call-to-action. Focus on clean layout and clear hierarchy."
        },
        {
            label: "Sales Landing",
            value: "A modern sales landing page with a clean white and dark theme, bold hero section, feature grid, 'How it works' section, pricing, and a strong call-to-action banner."
        },
        {
            label: "FinTech Landing",
            value: "A sleek fintech landing page with dark and light sections, green accent colors, a hero with app preview, feature grid, testimonials, pricing, and a strong CTA."
        },
        {
            label: "Crypto Exchange",
            value: "A crypto trading dashboard with a dark theme, trading chart, order book, trade history, and live price indicators with modern UI elements."
        },
        {
            label: "Payment Platform",
            value: "A clean landing page for a payment platform with a strong hero section, product preview, feature grid, use cases, pricing, and a clear call-to-action."
        },
        {
            label: "Neobank Website",
            value: "A modern banking website with app preview, trust metrics, feature sections, comparison table, testimonials, and a strong sign-up call-to-action."
        }
    ];
    const handleSuggestionClick = (value: string) => {
        setInput(value);
    };
    return (
        <div className='w-full relative min-h-screen'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='flex flex-col items-center justify-center px-4 pt-28'>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='text-4xl font-serif  sm:text-5xl md:text-6xl mb-4 tracking-tight xl:text-7xl font-bold text-center'>
                        Turn your ideas into a website with AI
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className='text-lg text-muted-foreground max-w-lg mb-4 text-center'>
                        Just describe your idea and watch Nova UI turn it into a stunning website design.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className='w-full max-w-2xl mb-4'>
                        <ChatInput
                            input={input}
                            setInput={setInput}
                            onSubmit={onSubmit}
                            status={status}
                            onStop={onStop}
                            isLoading={isLoading}
                        />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className='w-full max-w-2xl'>
                        <Suggestions className='justify-center flex-wrap'>
                            {suggestions.map((item) => (
                                <Suggestion key={item.label} suggestion={item.value} onClick={() => handleSuggestionClick(item.value)} />
                            ))}
                        </Suggestions>

                    </motion.div>
                    <motion.div initial={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ delay: 0.4 }} className='flex justify-center w-full max-w-3xl max-auto'>
                        projects
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export default NewProjectChat