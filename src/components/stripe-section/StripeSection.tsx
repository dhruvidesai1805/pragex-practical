"use client";

import React from "react";
import Image from "next/image";
import { useAnimationTick } from "@/hooks/useAnimationTick";
import { useResponsiveScale } from "@/hooks/useResponsiveScale";
import { DB_ICONS_WEB, DB_ICONS_MOB } from "@/constants/icons";

import ConnectingLines from "./ConnectingLines";
import AnimatedGrid from "./AnimatedGrid";
import TopPanel from "./TopPanel";
import BottomSequence from "./BottomSequence";
import FloatingNode from "./FloatingNode";
import NodeContent from "./NodeContent";

// ─── Animation sequence for bottom PSPs ───────────────────────────────────────
const PSP_ORDER = [1, 2, 0, 3]; // activation order: 2nd → 3rd → 1st → 4th

function isLineActive(index: number, tick: number): boolean {
    const pos = PSP_ORDER.indexOf(index);
    if (tick <= 8) return tick >= pos * 2 + 1;
    if (tick > 9 && tick <= 17) return tick < 10 + (3 - pos) * 2 + 1;
    if (tick > 17) return false;
    return true;
}

function isPspActive(index: number, tick: number): boolean {
    const pos = PSP_ORDER.indexOf(index);
    if (tick <= 8) return tick >= pos * 2 + 2;
    if (tick > 9 && tick <= 17) return tick < 10 + (3 - pos) * 2;
    if (tick > 17) return false;
    return true;
}

/**
 * Main orchestrator component that assembles the full Stripe architecture
 * diagram with animated nodes, connecting lines, and icon grids.
 */
export default function StripeSection() {
    const { scale, isMobile } = useResponsiveScale();
    const topTick = useAnimationTick(900, 16);
    const bottomTick = useAnimationTick(600, 20);
    const dbTick = useAnimationTick(2500, DB_ICONS_WEB.length);

    const DB_ICONS = isMobile ? DB_ICONS_MOB : DB_ICONS_WEB;
    const activeLines = [0, 1, 2, 3].map((i) => isLineActive(i, bottomTick));

    return (
        <div
            style={{ width: `${1000 * scale}px`, height: `${640 * scale}px` }}
            className="relative flex-shrink-0"
        >
            <div
                className="relative w-[1000px] h-[640px]"
                style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
            >
                {/* SVG lines */}
                <ConnectingLines activeLines={activeLines} />

                {/* ── Top source nodes ── */}
                <TopPanel topTick={topTick} />

                {/* ── Intermediaries ── */}
                <FloatingNode x={350} y={210}>
                    <NodeContent className="!bg-[#362baa]">SDK</NodeContent>
                </FloatingNode>

                <FloatingNode x={710} y={210}>
                    <NodeContent className="!bg-[#362baa]">Event Destinations</NodeContent>
                </FloatingNode>

                {/* ── Left side ── */}
                <FloatingNode x={350} y={300}>
                    <NodeContent className="flex items-center gap-1">
                        App Marketplace <span className="text-[18px]">↝</span>
                    </NodeContent>
                </FloatingNode>

                <div
                    className="absolute -translate-y-1/2"
                    style={{ left: "40px", top: "300px" }}
                >
                    <AnimatedGrid isMobile={isMobile} />
                </div>

                {/* ── Center Stripe logo ── */}
                <FloatingNode x={500} y={300}>
                    <div className="w-28 h-28 rounded-[20px] bg-[#533afd] flex items-center justify-center border border-[#7a73ff]/30">
                        <span className="text-white font-bold text-3xl tracking-tighter">
                            stripe
                        </span>
                    </div>
                </FloatingNode>

                {/* ── Right side ── */}
                <FloatingNode x={650} y={300}>
                    <NodeContent>Data Pipeline</NodeContent>
                </FloatingNode>

                <FloatingNode x={850} y={300}>
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center p-2 animate-flip-in">
                        <div key={dbTick}>
                            <Image
                                src={DB_ICONS[dbTick]}
                                alt="database icon"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </FloatingNode>

                {/* ── Bottom sequence ── */}
                <BottomSequence isPspActive={(i) => isPspActive(i, bottomTick)} />
            </div>
        </div>
    );
}
