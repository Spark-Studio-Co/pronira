import React from "react";

interface TariffItem {
  text: string;
  icon: string;
  iconAlt: string;
}

interface TariffsCardProps {
  title: string;
  items: TariffItem[];
  highlightedNote?: React.ReactNode;
  isActive?: boolean;
}

export const TariffsCard: React.FC<TariffsCardProps> = ({
  title,
  items,
  isActive = false,

  highlightedNote,
}) => {
  const titleClass = `rounded-sm w-full mb-4 py-3 text-center font-semibold ${
    isActive ? "bg-gray-200 text-dark" : "bg-main text-white"
  }`;

  const itemClass = `w-full block text-center py-2 px-4 rounded-sm ${
    isActive ? "bg-gray-100 text-dark" : "bg-main text-white"
  }`;

  const noteClass = `w-full text-center py-2 px-4 rounded-sm mt-10 ${
    isActive ? "bg-gray-100 text-dark" : "bg-main text-white"
  }`;

  const borderClass = `flex-1 border-2 w-[20vw] p-4 rounded-xl flex flex-col ${
    isActive ? "border-gray-300" : "border-gray-400"
  }`;

  return (
    <div className="flex flex-col h-full justify-between min-h-[300px]">
      <span className={titleClass}>{title}</span>
      <div className={borderClass}>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className={`flex items-center gap-2 ${itemClass}`}>
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.iconAlt || "icon"}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="w-full text-left">{item.text}</span>
            </div>
          ))}

          {highlightedNote && (
            <div className={noteClass}>{highlightedNote}</div>
          )}
        </div>
      </div>
    </div>
  );
};
