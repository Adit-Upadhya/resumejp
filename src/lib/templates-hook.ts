"use client";

import { useEffect, useState } from "react";
import { loadTemplate, saveTemplate, type TemplateKey } from "./templates";

export function useTemplate(): [TemplateKey, (k: TemplateKey) => void, boolean] {
  const [template, setTemplate] = useState<TemplateKey>("jis-a3");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setTemplate(loadTemplate());
    setHydrated(true);
  }, []);
  function update(k: TemplateKey) {
    setTemplate(k);
    saveTemplate(k);
  }
  return [template, update, hydrated];
}
