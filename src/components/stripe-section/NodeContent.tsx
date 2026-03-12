import React from "react";
import type { NodeContentProps } from "@/types";

/**
 * A reusable pill-shaped label used inside nodes (e.g., "ERP", "SDK", "Orchestration").
 */
export default function NodeContent({ children, className = "" }: NodeContentProps) {
    return (
        <div
            className={`px-4 py-1.5 rounded-md border bg-[#533afd] border-[#635bff] text-white text-[14px] font-medium whitespace-nowrap ${className}`}
        >
            {children}
        </div>
    );
}
