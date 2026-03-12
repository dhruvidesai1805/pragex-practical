import React from "react";
import type { DashedBoxProps } from "@/types";

/**
 * An empty dashed-border placeholder box shown when a node is inactive.
 */
export default function DashedBox({ className = "" }: DashedBoxProps) {
    return (
        <div
            className={`w-[85px] h-[36px] rounded-lg border-[1.5px] border-dashed border-white/15 bg-[rgba(15,20,35,0.3)] transition-all duration-300 ${className}`}
        />
    );
}
