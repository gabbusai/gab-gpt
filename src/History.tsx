import { useEffect, useRef, } from 'react'
import { conversation } from './utils/types'
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { PropagateLoader } from 'react-spinners';

type HistoryPageProps = {
    conversation: conversation[];
    loading: boolean
}

function HistoryPage({conversation, loading}: HistoryPageProps) {

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, [conversation, loading]);

    return (
        <div className='flex flex-col gap-y-6 overflow-x-hidden'>
            {conversation.map((entry, index) => (
                <motion.div key={index} className={`relative w-auto p-5 rounded-xl shadow-lg shadow-zinc-500 ${entry.type === 'user' ? 'bg-zinc-50' : 'bg-zinc-800'}`}
                initial={{ 
                    translateX: entry.type === 'user' ? -1000 : 1000
                }}
                animate={{ 
                    translateX: 0
                 }}
                transition={{ 
                    duration: .7,
                    ease: 'easeInOut',

                 }}
                >
                    <div className='grid justify-items-end'>
                        <p className={`shadow-md font-martianMono text-[22px] font-bold rounded-full  w-16 grid place-items-center h-16  
                        ${entry.type === "user" ? "justify-self-end bg-zinc-900 text-white" 
                        : "justify-self-start bg-white text-zinc-900"} `}>

                        {entry.type === 'user'? 'User': 'AI '}
                        </p>
                    </div>
                   
                    <div className="grid w-auto pb-10 ">
                        <ReactMarkdown 
                            children={ entry.message  ?  entry.message  : ""} 
                            className={`font-martianMono text-[18px] ${entry.type === 'user' ? 'text-right mr-[100px] text-zinc-800' :
                            ' text-zinc-50 text-left ml-[100px] '}`}
                        />
                    </div>
                    
                    
                </motion.div>
            ))}
            {loading && <div className='w-[100%] grid place-items-center py-4 h-16'>
                <PropagateLoader color="#27272A"/>
                </div>}
            <div className=""
            ref={scrollRef}
            />
        </div>
    )
}

export default HistoryPage
