"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { X, FileText } from "lucide-react";
import { useState } from "react";

interface InstructionsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileInstructionsPopup({
  isOpen,
  onClose,
}: InstructionsPopupProps) {
  const [downloading, setDownloading] = useState<string | null>(null);

  const documents = [
    { name: "Прочитай меня", path: "/assets/instructions.docx" },
    { name: "Скачать TXT инструкцию", path: "/assets/readme.docx" },
    {
      name: "Пользовательское соглашение",
      path: "/assets/user_agreement.docx",
    },
    {
      name: "Политика конфиденциальности",
      path: "/assets/privacy_policy.docx",
    },
  ];

  const handleDownload = async (documentPath: string, documentName: string) => {
    try {
      setDownloading(documentName);

      // In a real application, you would fetch the file from your server
      const response = await fetch(documentPath);
      const blob = await response.blob();

      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = documentPath.split("/").pop() || "document.docx";
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      setDownloading(null);
    } catch (error) {
      console.error("Error downloading file:", error);
      setDownloading(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
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
              <div className="relative p-4 border-b border-gray-200">
                <button
                  className="absolute right-2 top-2 p-1 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </button>
                <h3 className="text-center text-lg font-bold text-gray-900">
                  Инструкция по установке
                </h3>
              </div>
              <div className="p-6">
                <p className="mb-6 text-gray-700 text-center">
                  Выберите формат инструкции для скачивания в зависимости от
                  вашего устройства
                </p>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <Button
                      key={doc.path}
                      variant="default"
                      className="w-full h-[50px] rounded-full bg-main flex items-center justify-center gap-2"
                      onClick={() => handleDownload(doc.path, doc.name)}
                      disabled={downloading === doc.name}
                    >
                      {downloading === doc.name ? (
                        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                      ) : (
                        <FileText className="h-4 w-4 mr-2" />
                      )}
                      {doc.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
