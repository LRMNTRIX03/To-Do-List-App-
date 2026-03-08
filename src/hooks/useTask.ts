import { useState, useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type {
  Todo,
  Priority,
  Category,
  FilterType,
  SortType,
  TodoStats,
  UseTodosReturn,
} from "../types";

const PRIORITY_WEIGHT: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useLocalStorage<Todo[]>("taskflow_v3", []);
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortType>("newest");

  // ── Derived state ──────────────────────────────────────────
  const categories = useMemo<string[]>(() => {
    const unique = [...new Set(todos.map((t) => t.category).filter(Boolean))];
    return ["All", ...unique];
  }, [todos]);

  const filteredAndSorted = useMemo<Todo[]>(() => {
    const filtered = todos.filter((todo) => {
      const matchFilter =
        filter === "all" ||
        (filter === "active" ? !todo.completed : todo.completed);
      const matchSearch = todo.text
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "All" || todo.category === activeCategory;
      return matchFilter && matchSearch && matchCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "newest") return b.createdAt - a.createdAt;
      if (sortBy === "oldest") return a.createdAt - b.createdAt;
      if (sortBy === "priority")
        return PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
      return 0;
    });
  }, [todos, filter, search, activeCategory, sortBy]);

  const stats = useMemo<TodoStats>(() => {
    const completed = todos.filter((t) => t.completed).length;
    const total = todos.length;
    return {
      total,
      completed,
      active: total - completed,
      progress: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [todos]);


  const addTodo = useCallback(
    (text: string, priority: Priority, category: Category): boolean => {
      if (!text.trim()) return false;
      const newTodo: Todo = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        text: text.trim(),
        completed: false,
        priority,
        category,
        createdAt: Date.now(),
      };
      setTodos((prev) => [newTodo, ...prev]);
      return true;
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    (id: string): void => {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    (id: string): void => {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    },
    [setTodos]
  );

  const editTodo = useCallback(
    (id: string, text: string): void => {
      if (!text.trim()) return;
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, text: text.trim() } : t))
      );
    },
    [setTodos]
  );

  const clearCompleted = useCallback((): void => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, [setTodos]);

  return {
    todos: filteredAndSorted,
    allTodos: todos,
    stats,
    categories,
    filter,
    setFilter,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    sortBy,
    setSortBy,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
  };
}