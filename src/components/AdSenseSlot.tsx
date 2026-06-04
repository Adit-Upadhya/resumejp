"use client";

import { useEffect, useRef } from "react";

interface Props {
  client: string;
  slot: string;
}

/**
 * Renders AdSense imperatively via useEffect so the <ins> element never
 * enters React's VDOM. This prevents React from throwing during reconciliation
 * when AdSense injects its iframe children into the element.
 */
export function AdSenseSlot({ client, slot }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", client);
    ins.setAttribute("data-ad-slot", slot);
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    ref.current.appendChild(ins);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // AdSense blocked or not yet loaded — ignore
    }
    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [client, slot]);

  return <div />;
}
