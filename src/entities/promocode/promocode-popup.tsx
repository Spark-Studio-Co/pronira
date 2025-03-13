"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, X } from "lucide-react";
import { Button } from "@/shared/ui/button";

interface PromoCodePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PromoCodePopup({ isOpen, onClose }: PromoCodePopupProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("test");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--color-dark)]/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative p-4 border-b border-[var(--color-gray-light)]">
                <div
                  className="absolute right-2 top-2 p-1 rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </div>
                <h3 className="text-center text-lg font-bold text-[var(--color-dark)]">
                  Промокод для друга
                </h3>
              </div>
              <div className="p-6 text-center">
                <p className="mb-4 text-[var(--color-dark)]/70">
                  Поделитесь этим промокодом с другом, чтобы он получил скидку
                  на первый заказ
                </p>
                <div className="relative flex items-center justify-between bg-[var(--color-gray-light)] p-3 rounded-md">
                  <span className="font-mono text-lg font-bold tracking-wider text-[var(--color-dark)]">
                    TEST
                  </span>
                  <button
                    className="p-1 rounded-md hover:bg-[var(--color-main-light)] transition-colors"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <Check className="h-5 w-5 text-[var(--color-secondary)]" />
                    ) : (
                      <Copy className="h-5 w-5 text-[var(--color-main)]" />
                    )}
                  </button>
                </div>
              </div>
              <div className="p-4 bg-[var(--color-gray-light)]">
                <Button
                  variant="primary"
                  className="w-full"
                  text="Закрыть"
                  onClick={onClose}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
