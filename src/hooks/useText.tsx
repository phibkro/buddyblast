import { useCallback, useEffect, useState } from "react";

export function useText(
  key: string,
  defaultValue = "",
  storage = localStorage,
): [string, (value: string) => void] {
  const [text, setText] = useState<string>(() => {
    // Initialize from local storage or default to empty string
    const data = localStorage.getItem(key);
    return data ? data : defaultValue;
  });
  const setTextState = useCallback((value: string) => {
    setText(value);
  }, []);
  // Whenever text changes, update local storage
  useEffect(() => {
    try {
      storage.setItem(key, text);
    } catch (error) {
      console.error(error);
    }
  }, [text, key, storage]);
  return [text, setTextState];
}
