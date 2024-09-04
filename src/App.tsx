import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState } from 'react';
import { conversation } from './utils/types';
import HistoryPage from './History';

const App = () => {
  const [prompt, setPrompt] = useState('');
  //const [aiResponse, setResponse] = useState<GenerateContentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [history, setHistory] = useState<conversation[]>([]);
  const API_KEY = import.meta.env.VITE_REACT_GEMINI_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleClick = async () => {
    setLoading(true);
    try {
      const conversationPrompt = history.reduce((acc, entry) => {
        return acc + (entry.type === 'user' ? `User: ${entry.message}\n` : `AI: ${entry.message}\n`);
      }, '') + `User: ${prompt}\n`;
      // Make a request to the API and get the response.
      const response = await model.generateContent(conversationPrompt);
      setHistory([...history, { type: 'user', message: prompt }, { type: 'ai', message: response.response.text() }]);
      //setResponse(response); unused for now...
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  if(error){
    return (
      <div className='h-screen w-screen overflow-y-scroll bg-stone-900 grid place-items-center'>
        <h1 className='text-4xl text-white text-center'>
          An error has occured, please never fall in love again.
        </h1>
      </div>
    )
  }
  return (
    <div className='h-screen w-screen overflow-y-scroll bg-stone-900'>

        <div className="bg-slate-200 rounded-xl m-auto w-[80vw] h-[80vh] mt-5 overflow-y-scroll p-4">
          <HistoryPage conversation={history} loading={loading} />
        </div>

      <div className="grid place-items-center w-screen ">
        <div className="m-auto mt-[50px] w-[70vw] flex  h-[10vh] rounded-xl">

        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} 
        className='font-martianMono text-[22px] rounded-l-3xl w-[60vw] text-center h-[8vh]
        text-zinc-900'
        />
        <button onClick={handleClick}
        className='h-[8vh] w-[10vw] rounded-r-3xl bg-green-400 text-white text-[32px] font-martianMono'
        >Enter
        </button>

      </div>
      </div>

      
    </div>
  );
};

export default App