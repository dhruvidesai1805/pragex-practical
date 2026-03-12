import React from "react";
import type { TopPanelProps } from "@/types";
import NodeContent from "./NodeContent";
import DashedBox from "./DashedBox";

// ─── Visibility helpers ───────────────────────────────────────────────────────
// Group A: ERP (1st) + Subscriptions (3rd) — toggle together
// Group B: CRM (2nd) + Legacy billing (4th) + Booking system (5th) — toggle together
// The cycle overlaps so BOTH groups are never hidden at the same time.
const isGroupAVisible = (topTick: number) => topTick % 8 < 6;
const isGroupBVisible = (topTick: number) => topTick % 8 > 2;

/**
 * The top bordered panel containing all 5 source nodes.
 * Nodes animate in two interleaved groups so the panel is never empty.
 */
export default function TopPanel({ topTick }: TopPanelProps) {
    const groupA = isGroupAVisible(topTick);
    const groupB = isGroupBVisible(topTick);

    return (
        <div
            className="absolute left-1/2 -translate-x-1/2 z-10"
            style={{ top: "68px", width: "740px" }}
        >
            <div className="flex items-center justify-center gap-4 px-6 py-3 rounded-2xl border border-[#2b255e]/50 bg-[#161332]/80 shadow-[0_4px_24px_rgba(0,0,0,0.2)] min-h-[64px]">
                {/* Node 1 – ERP (Group A) */}
                <div className="w-[60px] flex justify-center">
                    {groupA ? (
                        <NodeContent className="!bg-[#362baa] animate-[swipeReveal_0.5s_ease_forwards]">
                            ERP
                        </NodeContent>
                    ) : (
                        <DashedBox className="!w-full" />
                    )}
                </div>

                {/* Node 2 – CRM (Group B) */}
                <div className="w-[65px] flex justify-center">
                    {groupB ? (
                        <NodeContent className="!bg-[#362baa] animate-[swipeReveal_0.5s_ease_forwards]">
                            CRM
                        </NodeContent>
                    ) : (
                        <DashedBox className="!w-full" />
                    )}
                </div>

                {/* Node 3 – Subscriptions (Group A) */}
                <div className="w-[110px] flex justify-center">
                    {groupA ? (
                        <NodeContent className="!bg-[#362baa] animate-[swipeReveal_0.5s_ease_forwards]">
                            Subscriptions
                        </NodeContent>
                    ) : (
                        <DashedBox className="!w-full" />
                    )}
                </div>

                {/* Node 4 – Legacy billing (Group B) */}
                <div className="w-[110px] flex justify-center">
                    {groupB ? (
                        <NodeContent className="!bg-[#362baa] animate-[swipeReveal_0.5s_ease_forwards]">
                            Legacy billing
                        </NodeContent>
                    ) : (
                        <DashedBox className="!w-full" />
                    )}
                </div>

                {/* Node 5 – Booking system (Group B) */}
                <div className="w-[120px] flex justify-center">
                    {groupB ? (
                        <NodeContent className="!bg-[#362baa] animate-[swipeReveal_0.5s_ease_forwards]">
                            Booking system
                        </NodeContent>
                    ) : (
                        <DashedBox className="!w-full" />
                    )}
                </div>
            </div>
        </div>
    );
}
