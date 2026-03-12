import React from "react";
import type { ConnectingLinesProps } from "@/types";

// ─── Animated line using SVG mask reveal ──────────────────────────────────────
function DrawnLine({ d, id, active }: { d: string; id: string; active: boolean }) {
    return (
        <>
            {/* Base faint dashed line (always visible) */}
            <path
                d={d}
                className="stroke-[#2a2f42] stroke-[1.5px] fill-none"
                strokeDasharray="4 4"
            />

            {/* Mask that progressively reveals the glowing line */}
            <mask id={id}>
                <path
                    d={d}
                    stroke="white"
                    strokeWidth="6"
                    fill="none"
                    pathLength="100"
                    strokeDasharray="100 100"
                    strokeDashoffset={active ? "0" : "100"}
                    style={{ transition: "stroke-dashoffset 0.6s ease-in-out" }}
                />
            </mask>

            {/* Glowing purple line, clipped by the mask */}
            <path
                d={d}
                className="stroke-[#635bff] stroke-[2px] fill-none"
                strokeDasharray="4 4"
                style={{ filter: "drop-shadow(0 0 6px rgba(99,91,255,0.8))" }}
                mask={`url(#${id})`}
            />
        </>
    );
}

// ─── Layout coordinates ───────────────────────────────────────────────────────
//   Stripe center : x=500, y=300  (112×112  → left 444, right 556, top 244, bottom 356)
//   SDK           : x=350, y=210
//   EventDest     : x=710, y=210
//   Orchestration : x=500, y=420
//   PSP nodes     : y=520  (x: 350, 450, 550, 650)

const STATIC_PATHS: Record<string, string> = {
    // Top panel → intermediaries
    panelToSdk: "M 350 122 V 196",
    panelToEd: "M 710 122 V 196",

    // Intermediaries → Stripe
    sdkToStripe: "M 350 224 V 262 H 444",
    edToStripe: "M 710 224 V 262 H 556",

    // Left side
    gridToMarket: "M 214 300 H 290",
    marketToStripe: "M 410 300 H 444",

    // Right side
    stripeToPipeline: "M 556 300 H 595",
    pipelineToDb: "M 706 300 H 810",

    // Stripe → Orchestration
    stripeToOrch: "M 500 356 V 406",
};

const BOTTOM_PATHS = [
    "M 500 434 V 480 H 350 V 508",
    "M 500 434 V 480 H 450 V 508",
    "M 500 434 V 480 H 550 V 508",
    "M 500 434 V 480 H 650 V 508",
];

const JUNCTION_DOTS = [
    { x: 350, y: 160 },
    { x: 710, y: 160 },
    { x: 500, y: 480 },
];

/**
 * SVG overlay that renders all connecting dashed lines and junction dots.
 * The bottom 4 lines (Orchestration → PSPs) animate via mask-based reveal.
 */
export default function ConnectingLines({
    activeLines = [false, false, false, false],
}: ConnectingLinesProps) {
    return (
        <svg
            className="absolute inset-0 pointer-events-none w-full h-full"
            viewBox="0 0 1000 640"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Static dashed lines */}
            {Object.entries(STATIC_PATHS).map(([key, d]) => (
                <path
                    key={key}
                    d={d}
                    className="stroke-[#2a2f42] stroke-[1.5px] fill-none"
                    strokeDasharray="4 4"
                />
            ))}

            {/* Junction dots */}
            {JUNCTION_DOTS.map((dot, i) => (
                <circle
                    key={`dot-${i}`}
                    cx={dot.x}
                    cy={dot.y}
                    r="3.5"
                    fill="#4b43c6"
                    opacity="0.9"
                />
            ))}

            {/* Animated bottom lines (Orchestration → PSPs) */}
            {BOTTOM_PATHS.map((d, i) => (
                <DrawnLine
                    key={`psp-line-${i}`}
                    id={`psp-mask-${i}`}
                    d={d}
                    active={activeLines[i] ?? false}
                />
            ))}
        </svg>
    );
}
