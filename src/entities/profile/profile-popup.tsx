"use client";

import { Button } from "@/shared/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface InstructionsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileInstructionsPopup({
  isOpen,
  onClose,
}: InstructionsPopupProps) {
  const handleDownload = (platform: string) => {
    console.log(`Downloading instructions for ${platform}`);
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
                  Инструкция по установке
                </h3>
              </div>
              <div className="p-6">
                <p className="mb-6 text-[var(--color-dark)]/70 text-center">
                  Выберите формат инструкции для скачивания в зависимости от
                  вашего устройства
                </p>
                <div className="space-y-4">
                  <Button
                    variant="primary"
                    className="w-full flex items-center justify-center"
                    onClick={() => handleDownload("pdf")}
                    text="Прочитай меня"
                  />
                  <Button
                    variant="primary"
                    className="w-full flex items-center justify-center"
                    onClick={() => handleDownload("pdf")}
                    text="Скачать TXT инструкцию"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
