import React from "react";
import type { FloatingNodeProps } from "@/types";

/**
 * An absolutely-positioned container used to place nodes on the diagram.
 * It centers its children around the given (x,y) coordinates.
 */
export default function FloatingNode({ children, x, y }: FloatingNodeProps) {
    return (
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${x}px`, top: `${y}px` }}
        >
            {children}
        </div>
    );
}
