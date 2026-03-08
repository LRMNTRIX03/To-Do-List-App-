import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Flame, Zap, Leaf } from "lucide-react";
import type { TodoInputProps, Priority, Category } from "../types";

interface PriorityOption {
  key: Priority;
  label: string;
  Icon: React.ElementType;
  selectedCls: string;
}

const PRIORITY_OPTIONS: PriorityOption[] = [
  {
    key: "low",
    label: "Rendah",
    Icon: Leaf,
    selectedCls: "text-emerald-600 border-emerald-300 bg-emerald-50",
  },
  {
    key: "medium",
    label: "Sedang",
    Icon: Zap,
    selectedCls: "text-amber-600 border-amber-300 bg-amber-50",
  },
  {
    key: "high",
    label: "Tinggi",
    Icon: Flame,
    selectedCls: "text-rose-600 border-rose-300 bg-rose-50",
  },
];

const CATEGORIES: Category[] = [
  "Personal", "Work", "Shopping", "Health", "Finance", "Learning", "Other",
];

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState<Category>("Personal");
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleSubmit = (): void => {
    const success = onAdd(text, priority, category);
    if (success) {
      setText("");
      setExpanded(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") { setExpanded(false); setText(""); }
  };

  return (
    <motion.div
      layout
      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
        expanded
          ? "border-blue-300 shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
          : "border-blue-100 shadow-sm"
      }`}
    >

      <div className="flex items-center gap-3 p-4">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
          expanded ? "bg-blue-100" : "bg-slate-100"
        }`}>
          <Plus size={15} className={expanded ? "text-blue-500" : "text-slate-400"} />
        </div>

        <input
          value={text}
          onChange={(e) => { setText(e.target.value); if (!expanded) setExpanded(true); }}
          onFocus={() => setExpanded(true)}
          onKeyDown={handleKeyDown}
          placeholder="Tambah task baru…"
          className="flex-1 bg-transparent text-sm text-slate-600 placeholder:text-gray-300 outline-none"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />

        <AnimatePresence>
          {text && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleSubmit}
              type="button"
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-sky-500 rounded-xl text-xs font-bold text-white shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 transition-shadow"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <Plus size={12} /> Tambah
            </motion.button>
          )}
        </AnimatePresence>
      </div>

 
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-blue-50">
              <div className="flex flex-wrap gap-5 mt-4">

         
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Prioritas
                  </p>
                  <div className="flex gap-2">
                    {PRIORITY_OPTIONS.map(({ key, label, Icon, selectedCls }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setPriority(key)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          priority === key
                            ? selectedCls
                            : "border-slate-200 text-slate-400 hover:border-slate-300"
                        }`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        <Icon size={11} /> {label}
                      </button>
                    ))}
                  </div>
                </div>

      
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Kategori
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          category === cat
                            ? "border-blue-300 text-blue-600 bg-blue-50"
                            : "border-slate-200 text-slate-400 hover:border-blue-200 hover:text-blue-400"
                        }`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};