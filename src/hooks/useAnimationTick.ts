"use client";

import { useState, useEffect } from "react";

/**
 * Returns a tick value that increments on a fixed interval and wraps at `max`.
 * Used to drive step-based animations without external libraries.
 *
 * @param intervalMs - Milliseconds between each tick increment.
 * @param max        - The tick resets to 0 after reaching this value.
 */
export function useAnimationTick(intervalMs: number, max: number): number {
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setTick((prev) => (prev + 1) % max);
        }, intervalMs);
        return () => clearInterval(id);
    }, [intervalMs, max]);

    return tick;
}
