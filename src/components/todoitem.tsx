import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Pencil, Trash2, Clock } from "lucide-react";
import { useRelativeTime } from "../hooks";
import { PriorityBadge, CategoryBadge, IconBtn } from "./ui";
import type { TodoItemProps, Priority } from "../types";

const PRIORITY_ACCENT: Record<Priority, string> = {
  high: "bg-rose-400",
  medium: "bg-amber-400",
  low: "bg-emerald-400",
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo, onToggle, onDelete, onEdit,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [draft, setDraft] = useState<string>(todo.text);
  const editRef = useRef<HTMLInputElement>(null);
  const timeAgo = useRelativeTime(todo.createdAt);

  useEffect(() => {
    if (editing) editRef.current?.focus();
  }, [editing]);

  const handleSave = (): void => {
    onEdit(todo.id, draft);
    setEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") { setDraft(todo.text); setEditing(false); }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.99 }}
      animate={{ opacity: todo.completed ? 0.6 : 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="group relative flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-4 py-3.5 hover:border-blue-200 hover:shadow-sm transition-all shadow-sm shadow-slate-50/80"
    >
     
      <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full ${PRIORITY_ACCENT[todo.priority]}`} />

  
      <motion.button
        whileTap={{ scale: 0.8 }}
        type="button"
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all ${
          todo.completed
            ? "bg-blue-500 border-blue-500"
            : "border-slate-300 hover:border-blue-400"
        }`}
      >
        <AnimatePresence>
          {todo.completed && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
            >
              <Check size={11} strokeWidth={3} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={editRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleEditKeyDown}
            className="w-full bg-blue-50 border border-blue-300 rounded-lg px-2.5 py-1 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-blue-100"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
        ) : (
          <p
            onDoubleClick={() => setEditing(true)}
            title="Double-click untuk edit"
            className={`text-sm leading-snug truncate cursor-default select-none ${
              todo.completed ? "line-through text-slate-400" : "text-slate-700"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {todo.text}
          </p>
        )}

    
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <PriorityBadge priority={todo.priority} />
          <CategoryBadge label={todo.category} />
          <span className="flex items-center gap-1 text-[10px] text-slate-300"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <Clock size={9} />
            {timeAgo}
          </span>
        </div>
      </div>


      <div className="flex items-center gap-0.5 opacity-100 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <IconBtn
          onClick={() => setEditing(true)}
          title="Edit task"
          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
        >
          <Pencil size={13} />
        </IconBtn>
        <IconBtn
          onClick={() => onDelete(todo.id)}
          title="Hapus task"
          className="text-red-500 hover:text-rose-500 hover:bg-rose-50"
        >
          <Trash2 size={13} />
        </IconBtn>
      </div>
    </motion.div>
  );
};