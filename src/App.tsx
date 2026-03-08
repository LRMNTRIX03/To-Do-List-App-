import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Target, CheckCircle2, Trash2, ListChecks } from "lucide-react";

import { useTodos } from "./hooks/useTask";
import {
  StatCard,
  ProgressBar,
  SearchBar,
  FilterTabs,
  SortDropdown,
  CategoryChip,
  TodoInput,
  TodoItem,
  EmptyState,
} from "./components";
import "./App.css"


const AmbientBackground: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-blue-200/50 blur-[100px]" />
    <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-sky-200/40 blur-[120px]" />
    <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-indigo-200/30 blur-[100px]" />
    <div
      className="absolute inset-0 opacity-[0.4]"
      style={{
        backgroundImage: "radial-gradient(circle, #bfdbfe 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  </div>
);


interface CircularProgressProps {
  value: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value }) => {
  const r = 26;
  const circumference = 2 * Math.PI * r;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center gap-1.5 flex-shrink-0"
    >
      <div className="relative w-[68px] h-[68px]">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 68 68">
          <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="5" />
          <motion.circle
            cx="34" cy="34" r={r}
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - value / 100) }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-sm font-black text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {value}%
        </span>
      </div>
      <span className="text-[9px] font-semibold text-blue-100 uppercase tracking-widest"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        selesai
      </span>
    </motion.div>
  );
};


const App: React.FC = () => {
  const {
    todos, allTodos, stats, categories,
    filter, setFilter,
    search, setSearch,
    activeCategory, setActiveCategory,
    sortBy, setSortBy,
    addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted,
  } = useTodos();

  const hasTodos = allTodos.length > 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
        * { box-sizing: border-box; }
        body { background: #eff6ff; margin: 0; min-height: 100vh; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-thumb { background: #93c5fd; border-radius: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 relative">
        <AmbientBackground />

        <div className="relative z-10 min-h-screen flex flex-col items-center py-10 px-4">

     
     
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="w-full max-w-[800px] bg-white/85 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-[0_12px_48px_rgba(59,130,246,0.12)] overflow-hidden min-h-[600px]"
          >

         
            <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 px-8 pt-8 pb-12 relative overflow-hidden">
            
              <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-12 -left-6 w-36 h-36 rounded-full bg-white/[0.07]" />
              <div className="absolute top-4 right-28 w-20 h-20 rounded-full bg-sky-400/30" />

              <div className="relative flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-blue-200 text-xs font-medium uppercase tracking-[0.15em] mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    To Do List
                  </p>
                  <h1
                    className="text-[40px] sm:text-[50px] font-black leading-none tracking-[-0.03em] text-white "
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    My Tasks
                  </h1>
                  <p className="text-xl text-blue-100 mt-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {!hasTodos
                      ? "Semangat kerjakan pekerjaan hari ini!"
                      : stats.active > 0
                      ? `${stats.active} task tersisa · ${stats.progress}% selesai`
                      : "Semuanya sudah selesai! 🎉"}
                  </p>
                  {hasTodos && (
                    <div className="mt-4 w-56">
                      <ProgressBar value={stats.progress} />
                    </div>
                  )}
                </div>
                {hasTodos && <CircularProgress value={stats.progress} />}
              </div>
            </div>

            
            <AnimatePresence>
              {hasTodos && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex gap-3 px-6 sm:px-8 -mt-6 mb-2 relative z-10"
                >
                  <StatCard label="Total" value={stats.total} icon={LayoutGrid} accentClass="bg-blue-500" />
                  <StatCard label="Aktif" value={stats.active} icon={Target} accentClass="bg-amber-400" />
                  <StatCard label="Selesai" value={stats.completed} icon={CheckCircle2} accentClass="bg-emerald-400" />
                </motion.div>
              )}
            </AnimatePresence>

          
            <div className="px-6 sm:px-8 pb-8 pt-5 space-y-4">

        
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <TodoInput onAdd={addTodo} />
              </motion.div>

           
              <AnimatePresence>
                {hasTodos && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3"
                  >
                    <div className="flex gap-2 items-center flex-wrap">
                      <div className="flex-1 min-w-[150px]">
                        <SearchBar value={search} onChange={setSearch} />
                      </div>
                      <FilterTabs filter={filter} setFilter={setFilter} />
                      <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                    </div>

                    {categories.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                        {categories.map((cat) => (
                          <CategoryChip key={cat} label={cat} active={activeCategory === cat}
                            onClick={() => setActiveCategory(cat)} />
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

           
              <motion.div layout className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {todos.length === 0 ? (
                    <EmptyState key="empty" filter={filter} search={search} />
                  ) : (
                    todos.map((todo) => (
                      <TodoItem key={todo.id} todo={todo}
                        onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
                    ))
                  )}
                </AnimatePresence>
              </motion.div>

             
              <AnimatePresence>
                {stats.completed > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center pt-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={clearCompleted} type="button"
                      className="flex items-center gap-2 px-5 py-2.5 text-xs text-slate-400 hover:text-rose-500 border border-slate-200 hover:border-rose-200 hover:bg-rose-50 rounded-xl transition-all"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      <Trash2 size={12} />
                      Hapus {stats.completed} task selesai
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

   
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-6 text-xs text-blue-400"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Semangat Menjalani Hari @Lutfi Rizaldi Mahida
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default App;