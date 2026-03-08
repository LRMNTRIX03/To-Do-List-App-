import React from "react";
import { motion } from "framer-motion";
import { Flame, Zap, Leaf, Tag } from "lucide-react";
import type {
  PriorityIconProps,
  PriorityBadgeProps,
  CategoryBadgeProps,
  IconBtnProps,
  StatCardProps,
  ProgressBarProps,
} from "../types";


export const PriorityIcon: React.FC<PriorityIconProps> = ({ priority, size = 14 }) => {
  const map: Record<string, { Icon: React.ElementType; cls: string }> = {
    high: { Icon: Flame, cls: "text-rose-500" },
    medium: { Icon: Zap, cls: "text-amber-500" },
    low: { Icon: Leaf, cls: "text-emerald-500" },
  };
  const { Icon, cls } = map[priority] ?? map.medium;
  return <Icon size={size} className={cls} />;
};


export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const map: Record<string, string> = {
    high: "bg-rose-50 text-rose-500 ring-rose-200",
    medium: "bg-amber-50 text-amber-500 ring-amber-200",
    low: "bg-emerald-50 text-emerald-600 ring-emerald-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest ring-1 ${map[priority]}`}>
      <PriorityIcon priority={priority} size={9} />
      {priority}
    </span>
  );
};

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ label }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide bg-blue-50 text-blue-500 ring-1 ring-blue-100">
    <Tag size={9} />
    {label}
  </span>
);

export const IconBtn: React.FC<IconBtnProps> = ({ onClick, title, className = "", children }) => (
  <motion.button
    whileHover={{ scale: 1.12 }}
    whileTap={{ scale: 0.88 }}
    onClick={onClick}
    title={title}
    type="button"
    className={`p-1.5 rounded-lg transition-colors ${className}`}
  >
    {children}
  </motion.button>
);


export const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, accentClass }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex-1 min-w-[80px] bg-white border border-blue-100 rounded-2xl p-4 relative overflow-hidden hover:border-blue-200 hover:shadow-sm transition-all shadow-sm shadow-blue-50"
  >
    <div className={`absolute top-0 left-0 w-[3px] h-full rounded-full ${accentClass}`} />
    <Icon size={15} className="text-slate-400 mb-2" />
    <div className="text-2xl font-black text-slate-700" style={{ fontFamily: "'Syne', sans-serif" }}>
      {value}
    </div>
    <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {label}
    </div>
  </motion.div>
);


export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => (
  <div className="relative h-1.5 bg-white/30 rounded-full overflow-hidden">
    <motion.div
      className="absolute inset-y-0 left-0 rounded-full bg-white"
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    />
  </div>
);