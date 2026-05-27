"use client";

import { useEffect, useState } from "react";
import { emptyResume, type Resume } from "./schema";

const STORAGE_KEY = "rirekisho-data-v1";

export function loadResume(): Resume {
  if (typeof window === "undefined") return emptyResume();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyResume();
    return { ...emptyResume(), ...(JSON.parse(raw) as Resume) };
  } catch {
    return emptyResume();
  }
}

export function saveResume(data: Resume): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // quota exceeded or disabled — ignore silently
  }
}

export function useDebouncedSave(data: Resume, delay = 400): void {
  useEffect(() => {
    const id = window.setTimeout(() => saveResume(data), delay);
    return () => window.clearTimeout(id);
  }, [data, delay]);
}

export function useLocalResume(): [Resume, React.Dispatch<React.SetStateAction<Resume>>, boolean] {
  const [data, setData] = useState<Resume>(emptyResume);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setData(loadResume());
    setHydrated(true);
  }, []);
  useDebouncedSave(data);
  return [data, setData, hydrated];
}
