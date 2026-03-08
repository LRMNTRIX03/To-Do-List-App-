import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useClickOutside } from "../hooks";
import type {
  SearchBarProps,
  FilterTabsProps,
  SortDropdownProps,
  CategoryChipProps,
  FilterType,
  SortType,
} from "../types";

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <div className="relative flex items-center">
    <Search size={14} className="absolute left-3 text-blue-300 pointer-events-none" />
    <input
      type="text"
      placeholder="Cari task…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-blue-100 rounded-xl pl-9 pr-8 py-2.5 text-sm text-slate-600 placeholder-slate-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    />
    <AnimatePresence>
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => onChange("")}
          type="button"
          className="absolute right-2.5 text-slate-300 hover:text-slate-500 transition-colors"
        >
          <X size={13} />
        </motion.button>
      )}
    </AnimatePresence>
  </div>
);

interface FilterTab {
  key: FilterType;
  label: string;
}

const FILTER_TABS: FilterTab[] = [
  { key: "all", label: "Semua" },
  { key: "active", label: "Aktif" },
  { key: "completed", label: "Selesai" },
];

export const FilterTabs: React.FC<FilterTabsProps> = ({ filter, setFilter }) => (
  <div className="flex bg-blue-50 border border-blue-100 rounded-xl p-1 gap-1 flex-shrink-0">
    {FILTER_TABS.map((tab) => (
      <button
        key={tab.key}
        type="button"
        onClick={() => setFilter(tab.key)}
        className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
          filter === tab.key ? "text-white" : "text-slate-400 hover:text-blue-500"
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {filter === tab.key && (
          <motion.span
            layoutId="filter-pill"
            className="absolute inset-0 rounded-lg bg-blue-500 shadow-sm shadow-blue-200"
          />
        )}
        <span className="relative">{tab.label}</span>
      </button>
    ))}
  </div>
);

interface SortOption {
  key: SortType;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { key: "newest", label: "Terbaru" },
  { key: "oldest", label: "Terlama" },
  { key: "priority", label: "Prioritas" },
];

export const SortDropdown: React.FC<SortDropdownProps> = ({ sortBy, setSortBy }) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null!);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <motion.button
        whileTap={{ scale: 0.96 }}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2.5 bg-white border border-blue-100 rounded-xl text-xs text-slate-400 hover:text-blue-500 hover:border-blue-200 transition-all shadow-sm"
      >
        <SlidersHorizontal size={13} />
        <ChevronDown size={11} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1.5 z-50 bg-white border border-blue-100 rounded-xl shadow-lg shadow-blue-100/50 overflow-hidden min-w-[130px]"
          >
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => { setSortBy(opt.key); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                  sortBy === opt.key
                    ? "text-blue-600 bg-blue-50 font-semibold"
                    : "text-slate-500 hover:text-blue-500 hover:bg-blue-50/50"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export const CategoryChip: React.FC<CategoryChipProps> = ({ label, active, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.94 }}
    type="button"
    onClick={onClick}
    className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
      active
        ? "text-white bg-blue-500 border-blue-500 shadow-sm shadow-blue-200"
        : "text-slate-400 border-slate-200 bg-white hover:text-blue-500 hover:border-blue-200"
    }`}
    style={{ fontFamily: "'DM Sans', sans-serif" }}
  >
    {label}
  </motion.button>
);