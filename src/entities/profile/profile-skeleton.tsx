"use client";

export const ProfileTabSkeleton = () => {
  return (
    <div className="rounded-[16px] w-full flex flex-col bg-gray-light p-4">
      <div className="w-full flex items-center gap-4">
        {/* Avatar skeleton */}
        <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />

        <div className="w-full flex flex-col items-start">
          <div className="w-full flex items-center justify-between">
            {/* Name skeleton */}
            <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse" />
            {/* Info icon skeleton */}
            <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse" />
          </div>

          {/* Balance skeleton */}
          <div className="h-5 w-40 bg-gray-200 rounded-md animate-pulse mt-1 mb-1" />

          {/* Subscription skeleton */}
          <div className="h-5 w-48 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>

      {/* Button skeletons */}
      <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse mt-[19px]" />
      <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse mt-[19px]" />
    </div>
  );
};
