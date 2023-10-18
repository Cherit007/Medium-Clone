"use client";

import { useEffect, useState } from "react";

interface Props {
  value: string;
  delay: number;
}

export default function useDebounceInput({ value, delay = 500 }: Props) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const val = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearInterval(val);
    };
  }, [value, delay]);

  return debouncedValue;
}
