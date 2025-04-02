interface FullscreenLoaderProps {
  isLoading?: boolean;
  message?: string;
  color?: "main" | "secondary" | "dark";
  opacity?: "light" | "medium" | "dark";
}

export default function FullscreenLoader({
  isLoading = true,
  message = "Loading...",
  opacity = "medium",
}: FullscreenLoaderProps) {
  if (!isLoading) return null;

  const opacityClasses = {
    light: "bg-black/20",
    medium: "bg-black/50",
    dark: "bg-black/80",
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${opacityClasses[opacity]}`}
      style={{ backdropFilter: "blur(4px)" }}
    >
      <div className="flex flex-col items-center justify-center gap-6 p-8 rounded-lg bg-white/90 dark:bg-dark/90 shadow-2xl">
        {message && (
          <p className="text-xl font-medium text-dark dark:text-gray-light text-center max-w-md">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
