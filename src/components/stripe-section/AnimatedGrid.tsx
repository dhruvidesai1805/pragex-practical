"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GRID_ICONS_WEB, GRID_ICONS_MOB } from "@/constants/icons";

/**
 * A 3×2 icon grid that randomly swaps tech logo icons in and out,
 * simulating the App Marketplace animation.
 */
export default function AnimatedGrid({ isMobile = false }: { isMobile?: boolean }) {
    const ICONS = isMobile ? GRID_ICONS_MOB : GRID_ICONS_WEB;
    const [slots, setSlots] = useState<(string | "EMPTY")[]>(Array(6).fill("EMPTY"));

    // Initialise with random icons on mount
    useEffect(() => {
        setSlots([
            ICONS[Math.floor(Math.random() * ICONS.length)],
            ICONS[Math.floor(Math.random() * ICONS.length)],
            ICONS[Math.floor(Math.random() * ICONS.length)],
            "EMPTY",
            ICONS[Math.floor(Math.random() * ICONS.length)],
            ICONS[Math.floor(Math.random() * ICONS.length)],
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    // Periodic random replacement
    useEffect(() => {
        const timer = setInterval(() => {
            setSlots((prev) => {
                const next = [...prev];
                const slot = Math.floor(Math.random() * 6);

                if (Math.random() > 0.7) {
                    next[slot] = "EMPTY";
                } else {
                    let icon = ICONS[Math.floor(Math.random() * ICONS.length)];
                    while (next.includes(icon)) {
                        icon = ICONS[Math.floor(Math.random() * ICONS.length)];
                    }
                    next[slot] = icon;
                }
                return next;
            });
        }, 2000);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    return (
        <div className="grid grid-cols-3 gap-2 bg-[#1c1e54] p-3 rounded-2xl border border-[#1e2336] shadow-2xl">
            {slots.map((src, i) => (
                <div
                    key={i}
                    className={`w-14 h-14 rounded-lg flex items-center justify-center p-2 overflow-hidden ${src === "EMPTY"
                            ? "border-[1.5px] border-dashed border-white/15 bg-[rgba(15,20,35,0.3)] opacity-30"
                            : "bg-white border border-gray-100"
                        }`}
                >
                    {src !== "EMPTY" && (
                        <div key={src} className="animate-flip-in">
                            <Image
                                src={src}
                                alt="stack-icon"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
