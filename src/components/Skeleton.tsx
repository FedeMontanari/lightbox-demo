import { cn } from "@/lib/utils";
import React from "react";

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-500", className)}
      {...props}
    />
  );
}
