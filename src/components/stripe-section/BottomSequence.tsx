import React from "react";
import type { BottomSequenceProps } from "@/types";
import FloatingNode from "./FloatingNode";
import NodeContent from "./NodeContent";
import DashedBox from "./DashedBox";

/**
 * The bottom area of the diagram: a fixed Orchestration node,
 * plus 4 PSP slots that animate on/off based on the tick sequence.
 */
export default function BottomSequence({ isPspActive }: BottomSequenceProps) {
    const pspPositions = [350, 450, 550, 650];

    return (
        <>
            {/* Orchestration node (always visible) */}
            <FloatingNode x={500} y={420}>
                <NodeContent className="px-6 py-2">Orchestration</NodeContent>
            </FloatingNode>

            {/* 4 PSP slots — y=520 matches SVG bottomPaths endpoints */}
            {pspPositions.map((x, i) =>
                isPspActive(i) ? (
                    <FloatingNode key={`psp-${i}`} x={x} y={520}>
                        <NodeContent className="w-[85px] text-center !bg-[#362baa] animate-[swipeReveal_0.6s_cubic-bezier(0.2,0.8,0.2,1)_forwards]">
                            PSP
                        </NodeContent>
                    </FloatingNode>
                ) : (
                    <FloatingNode key={`psp-${i}`} x={x} y={520}>
                        <DashedBox />
                    </FloatingNode>
                )
            )}
        </>
    );
}
