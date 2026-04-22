/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chat } from './components/Chat';
import { Sparkles, GraduationCap, ArrowRight, Heart, Monitor, Beaker, LogIn } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-bg-app flex flex-col p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6 text-white text-2xl font-black">
            <GraduationCap size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none">OrientaFP</h1>
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">Tu futuro profesional empieza aquí</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-pink-100 text-pink-600 rounded-full font-bold text-xs border border-pink-200">
            www.todofp.es
          </div>
          <button className="bg-slate-800 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md hover:bg-slate-700 transition-colors flex items-center gap-2">
            <LogIn size={16} />
            <span>Iniciar Sesión</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Chat Section (2/3) */}
        <section className="flex-1 flex flex-col min-h-[500px]">
          <Chat />
        </section>

        {/* Sidebar/Aside (1/3) */}
        <aside className="w-full lg:w-[380px] flex flex-col gap-6">
          {/* Fact Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-amber-400 p-6 rounded-3xl text-amber-950 shadow-lg"
          >
            <h3 className="font-black text-xl mb-2 flex items-center gap-2">
              <Sparkles size={20} />
              ¿Sabías qué?
            </h3>
            <p className="text-sm font-medium opacity-90">
              El 70% de los estudiantes de FP consiguen empleo en los primeros 6 meses tras graduarse.
            </p>
          </motion.div>

          {/* Families Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 glass-card rounded-3xl p-6 shadow-lg"
          >
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Familias Destacadas
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { icon: <Heart size={18} />, label: "Sanidad", tag: "14 Ciclos", color: "bg-red-100 text-red-600", borderColor: "border-red-100" },
                { icon: <Monitor size={18} />, label: "Informática", tag: "6 Ciclos", color: "bg-indigo-100 text-indigo-600", borderColor: "border-indigo-100" },
                { icon: <Beaker size={18} />, label: "Laboratorio", tag: "4 Ciclos", color: "bg-orange-100 text-orange-600", borderColor: "border-orange-100" },
              ].map((item, i) => (
                <div key={i} className="pill p-3 bg-white rounded-xl flex items-center gap-3 shadow-sm border border-slate-100 group cursor-pointer">
                  <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center transition-transform group-hover:scale-110`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 leading-none">{item.label}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{item.tag}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-center">
              <p className="text-xs font-bold text-slate-500 uppercase mb-2">Próxima Jornada</p>
              <p className="text-sm font-black text-slate-700">Puertas Abiertas Online</p>
              <p className="text-xs text-blue-600 font-bold mt-1">24 de Mayo</p>
            </div>
          </motion.div>

          <footer className="mt-auto py-4">
             <div className="flex items-center justify-center gap-2 text-slate-400 text-[10px] italic">
              <span>Orientación oficial basada en</span>
              <a href="https://www.todofp.es" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline flex items-center gap-1 font-bold">
                todofp.es <ArrowRight size={10} />
              </a>
            </div>
          </footer>
        </aside>
      </main>
    </div>
  );
}


