"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props<T extends { id: string }> {
  items: T[];
  renderItem: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, patch: Partial<T>) => void;
  onMove?: (from: number, to: number) => void;
  addLabel?: string;
  empty?: React.ReactNode;
}

export function RowList<T extends { id: string }>({
  items,
  renderItem,
  onAdd,
  onRemove,
  onUpdate,
  onMove,
  addLabel = "Add row",
  empty,
}: Props<T>) {
  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border bg-white p-3 shadow-sm"
          >
            <div className="flex items-start gap-2">
              {onMove && (
                <div className="flex flex-col gap-0.5 pt-1 text-muted-foreground">
                  <button
                    aria-label="move up"
                    className="hover:text-foreground disabled:opacity-30"
                    disabled={i === 0}
                    onClick={() => onMove(i, i - 1)}
                  >
                    <GripVertical className="h-3.5 w-3.5 rotate-180" />
                  </button>
                </div>
              )}
              <div className="flex-1">{renderItem(item, (patch) => onUpdate(item.id, patch))}</div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onRemove(item.id)}
                aria-label="Remove row"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {items.length === 0 && empty}

      <Button variant="outline" size="sm" onClick={onAdd} className="w-full">
        <Plus className="h-3.5 w-3.5" />
        {addLabel}
      </Button>
    </div>
  );
}
