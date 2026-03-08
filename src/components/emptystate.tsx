import React from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle2, Circle, ListTodo } from "lucide-react";
import type { EmptyStateProps, FilterType } from "../types";

interface EmptyConfig {
  icon: React.ElementType;
  title: string;
  sub: string;
}

function getConfig(filter: FilterType, search: string): EmptyConfig {
  if (search) {
    return { icon: Search, title: "Tidak ditemukan", sub: `Tidak ada task yang cocok dengan "${search}"` };
  }
  const map: Record<FilterType, EmptyConfig> = {
    active: { icon: CheckCircle2, title: "Semua selesai!", sub: "Tidak ada task aktif. Kerja bagus! 🎉" },
    completed: { icon: Circle, title: "Belum ada yang selesai", sub: "Selesaikan task untuk melihatnya di sini." },
    all: { icon: ListTodo, title: "Belum ada task", sub: "Tambahkan task pertamamu di atas." },
  };
  return map[filter];
}

export const EmptyState: React.FC<EmptyStateProps> = ({ filter, search }) => {
  const { icon: Icon, title, sub } = getConfig(filter, search);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-14 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 shadow-sm">
        <Icon size={24} className="text-blue-300" />
      </div>
      <h3 className="text-sm font-semibold text-slate-500" style={{ fontFamily: "'Syne', sans-serif" }}>
        {title}
      </h3>
      <p className="text-xs text-slate-400 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {sub}
      </p>
    </motion.div>
  );
};