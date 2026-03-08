import { useState, useCallback } from "react";

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue: SetValue<T> = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const next = typeof value === "function"
          ? (value as (prev: T) => T)(prev)
          : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
            throw new Error("Failed to save to localStorage");
        }
        return next;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}