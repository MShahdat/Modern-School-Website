
import React from "react";

// tiny helper
const cx = (...c) => c.filter(Boolean).join(" ");

/** Base skeleton block */
export function Skeleton({ className = "", style }) {
  return <div className={cx("bg-gray-200 rounded animate-pulse", className)} style={style} />;
}

/** Text lines */
export function SkeletonText({ lines = 2, className = "" }) {
  return (
    <div className={cx("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cx("h-4 w-full", i === lines - 1 && "w-5/6")} />
      ))}
    </div>
  );
}

/** Button */
export function SkeletonButton({ className = "h-9 w-28 rounded" }) {
  return <Skeleton className={className} />;
}

/** Image / media block (height via Tailwind class so it matches your cards) */
export function SkeletonMedia({ className = "w-full h-50" }) {
  return <Skeleton className={cx("w-full", className)} />;
}

/** Card preset (image + title + meta + excerpt + button) */
export function SkeletonCard({
  mediaClass = "h-50", // keep same as your card image height
  titleWidth = "w-3/4",
  metaWidth = "w-1/3",
  lines = 2,
  showButton = true,
  containerClass = "border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white",
  innerClass = "p-4",
}) {
  return (
    <div className={containerClass}>
      <SkeletonMedia className={cx("w-full", mediaClass)} />
      <div className={innerClass}>
        <Skeleton className={cx("h-5", titleWidth)} />
        <Skeleton className={cx("h-4 mt-2", metaWidth)} />
        <SkeletonText lines={lines} className="mt-3" />
        {showButton && <SkeletonButton className="mt-5 h-9 w-28 rounded" />}
      </div>
    </div>
  );
}

/** Grid preset — matches your responsive grid */
export function SkeletonGrid({
  count = 8,
  Card = SkeletonCard,
  cardProps = {},
  gridClass = "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8",
}) {
  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} {...cardProps} />
      ))}
    </div>
  );
}

/** Details page preset (hero image + title + date + content) */
export function SkeletonDetails({
  mediaClass = "w-full h-80 rounded-lg",
  titleWidth = "w-2/3",
  dateWidth = "w-40",
  lines = 6,
  containerClass = "border border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-white",
  innerClass = "p-6",
}) {
  return (
    <div className={containerClass}>
      <SkeletonMedia className={mediaClass} />
      <div className={innerClass}>
        <Skeleton className={cx("h-6", titleWidth)} />
        <Skeleton className={cx("h-4 mt-3", dateWidth)} />
        <SkeletonText lines={lines} className="mt-4" />
        <div className="mt-6 flex gap-4">
          <SkeletonButton className="h-9 w-36 rounded" />
          <SkeletonButton className="h-9 w-32 rounded" />
        </div>
      </div>
    </div>
  );
}

/**
 * Shimmer wrapper
 * Usage: <Shimmer show={loading} fallback={<SkeletonGrid .../>}>{children}</Shimmer>
 */
export function Shimmer({ show, fallback, children }) {
  if (show) return <>{fallback}</>;
  return <>{children}</>;
}
