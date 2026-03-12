"use client";

import { useState, useEffect } from "react";

/**
 * Calculates a CSS scale factor so the 1000px-wide diagram fits the viewport,
 * and reports whether the viewport qualifies as "mobile".
 */
export function useResponsiveScale() {
    const [scale, setScale] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const update = () => {
            const vw = window.innerWidth;
            setScale(Math.min(1, vw / 1000));
            setIsMobile(vw < 768);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return { scale, isMobile };
}
