import type { ReactNode } from "react";

export interface FloatingNodeProps {
    children: ReactNode;
    x: number;
    y: number;
}

export interface NodeContentProps {
    children: ReactNode;
    className?: string;
}
export interface DashedBoxProps {
    className?: string;
}

export interface ConnectingLinesProps {
    activeLines?: boolean[];
}

export interface TopPanelProps {
    topTick: number;
}

export interface BottomSequenceProps {
    isPspActive: (index: number) => boolean;
}
