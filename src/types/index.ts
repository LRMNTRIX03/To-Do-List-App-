
export type Priority = "low" | "medium" | "high";
export type FilterType = "all" | "active" | "completed";
export type SortType = "newest" | "oldest" | "priority";
export type Category =
  | "Personal"
  | "Work"
  | "Shopping"
  | "Health"
  | "Finance"
  | "Learning"
  | "Other";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  createdAt: number;
}


export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  progress: number; // 0–100
}

export interface UseTodosReturn {
  todos: Todo[];         
  allTodos: Todo[];       
  stats: TodoStats;
  categories: string[];  

  
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  search: string;
  setSearch: (s: string) => void;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  sortBy: SortType;
  setSortBy: (s: SortType) => void;

  
  addTodo: (text: string, priority: Priority, category: Category) => boolean;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  clearCompleted: () => void;
}


export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export interface TodoInputProps {
  onAdd: (text: string, priority: Priority, category: Category) => boolean;
}

export interface StatCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  accentClass: string;
}

export interface PriorityBadgeProps {
  priority: Priority;
}

export interface CategoryBadgeProps {
  label: string;
}

export interface PriorityIconProps {
  priority: Priority;
  size?: number;
}

export interface IconBtnProps {
  onClick: () => void;
  title: string;
  className?: string;
  children: React.ReactNode;
}

export interface ProgressBarProps {
  value: number; // 0–100
}

export interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export interface FilterTabsProps {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
}

export interface SortDropdownProps {
  sortBy: SortType;
  setSortBy: (s: SortType) => void;
}

export interface CategoryChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export interface EmptyStateProps {
  filter: FilterType;
  search: string;
}