"use client";

import { useEffect, useState } from "react";
import type { Resume } from "./schema";
import { sampleResume } from "./sample";

// Legacy key — older versions persisted the user's resume here. We no longer
// save resume data at all (privacy: nothing the user types is kept between
// page loads), so on mount we proactively delete anything left behind.
const STORAGE_KEY = "rirekisho-data-v1";

/**
 * Fallback loader used only by the standalone /preview page when it is opened
 * directly (the in-app PDF flow passes data via a short-lived token instead).
 * Since resume data is never persisted, this returns the sample.
 */
export function loadResume(): Resume {
  return sampleResume();
}

/**
 * Resume state for the editor. By design it is NOT persisted: every visit (and
 * every reload) starts from the sample, and nothing the user types is written
 * to storage. Users keep their work by downloading the PDF or a JSON backup.
 */
export function useLocalResume(): [Resume, React.Dispatch<React.SetStateAction<Resume>>, boolean] {
  const [data, setData] = useState<Resume>(sampleResume);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // Clear any resume data saved by older versions so nothing lingers.
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // storage disabled — nothing to clean up
    }
    setHydrated(true);
  }, []);
  return [data, setData, hydrated];
}
