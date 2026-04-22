import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Loader2, Sparkles, GraduationCap, MapPin, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chatWithGemini, Message } from '../services/geminiService';

const SUGGESTIONS = [
  "¿Qué grados medios hay de informática?",
  "Requisitos para grado superior",
  "¿Qué es la FP dual?",
  "FP a distancia",
];

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "¡Hola! Soy tu asistente de orientación para la FP. Puedo ayudarte a explorar ciclos formativos, requisitos y opciones según lo que publica www.todofp.es. ¿Qué te gustaría saber hoy?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const response = await chatWithGemini(newMessages);
    
    setMessages(prev => [...prev, { role: "model", content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full glass-card rounded-3xl shadow-xl overflow-hidden" id="chat-widget">
      {/* Header */}
      <div className="p-4 border-b border-blue-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg transform -rotate-3 text-white">
            <GraduationCap size={20} />
          </div>
          <div>
            <h2 className="font-display font-black text-slate-800 tracking-tight leading-none text-base">OrientaBot</h2>
            <p className="text-[10px] font-bold text-brand uppercase tracking-widest">En línea</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full font-bold text-[10px] border border-pink-200 uppercase tracking-tight">
          Info Oficial
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 flex flex-col pt-6 chat-container">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`p-4 max-w-[85%] font-medium leading-relaxed ${
              msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot text-slate-700'
            }`}>
              <div className="text-sm markdown-body prose prose-slate max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>
              </div>
              <span className={`text-[9px] font-bold uppercase mt-2 block ${
                msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'
              }`}>
                {msg.role === 'user' ? 'Tú' : 'OrientaBot'} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex gap-2 items-center text-slate-400 font-bold uppercase text-[10px]">
              <Loader2 className="w-3 h-3 animate-spin" />
              Buscando en todofp.es...
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      <div className="px-4 py-3 border-t border-blue-50 overflow-x-auto">
        <div className="flex gap-2 whitespace-nowrap overflow-x-auto pb-1 scrollbar-hide">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSend(s)}
              className="pill px-3 py-1.5 bg-white text-brand border border-blue-100 rounded-lg text-[11px] font-bold shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-50/50">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="relative"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="¿Qué quieres estudiar?"
            className="w-full p-4 pr-32 bg-slate-100 border-none rounded-2xl font-medium focus:ring-4 focus:ring-blue-100 text-slate-700 outline-none text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 bottom-2 bg-brand text-white px-6 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-brand-dark transition-all disabled:opacity-50 text-sm"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>
              <Send size={16} />
              <span>Enviar</span>
            </>}
          </button>
        </form>
      </div>
    </div>
  );
};
