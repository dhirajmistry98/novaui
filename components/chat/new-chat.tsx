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
        <div className='w-full relative min-h-screen bg-background dark:bg-black bg-[linear-gradient(to_bottom,_var(--muted)_0%,_transparent_100%)] dark:bg-[linear-gradient(to_bottom,_oklch(0.15_0_0)_0%,_oklch(0.1_0_0)_100%)] overflow-hidden'>
            <div className='absolute top-[-10%] left-1/2 -translate-x-1/2 w-[140%] aspect-square max-w-[1200px] rounded-full bg-gradient-to-b from-primary/5 via-primary/5 to-transparent border border-primary/10 dark:border-white/5 opacity-50 pointer-events-none' style={{
                maskImage: 'radial-gradient(circle at center, black 0%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 70%)'
            }} />
            <div className='w-full max-w-7xl mx-auto relative z-10'>
                <div className='flex flex-col items-center justify-center px-4 pt-48 pb-12 rounded-4xl bg-secondary/30 dark:bg-muted/10 border border-border/50 transition-all duration-700 mt-12'>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className='text-3xl font-serif sm:text-5xl md:text-6xl mb-12 tracking-tight xl:text-7xl font-bold text-center leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/30'
                    >
                        Turn your ideas <br />
                        into a website with AI
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
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className='w-full max-w-2xl mt-4'>
                        <Suggestions className='justify-center flex-wrap gap-x-2 gap-y-3'>
                            {suggestions.map((item) => (
                                <Suggestion key={item.label} suggestion={item.value} onClick={() => handleSuggestionClick(item.value)}>
                                    {item.label}
                                </Suggestion>
                            ))}
                        </Suggestions>

                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className='flex justify-center w-full mt-6 text-muted-foreground text-sm font-medium tracking-wide'>
                        Projects
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export default NewProjectChat