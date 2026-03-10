import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import './Grid.css';
import { motion } from 'framer-motion';

interface GridProps {
    selection: { width: number; height: number };
    onSelectionChange: (selection: { width: number; height: number }) => void;
}

export function Grid({ selection, onSelectionChange }: GridProps) {
    const gridRef = useRef<HTMLDivElement>(null);
    const rows = 10;
    const cols = 10;

    const handlePointerUpdate = (e: ReactPointerEvent | PointerEvent) => {
        if (!gridRef.current) return;

        // Check if pointer is a primary pointer to avoid multi-touch issues, 
        // or just handle any for simple interaction. We will handle primary.
        if (!e.isPrimary && e.type !== 'pointermove') return;

        // e.buttons === 1 means left mouse button is down, or touch is down
        // For pointermove, we only want to select if they are dragging
        if (e.type === 'pointermove' && e.buttons === 0) return;

        // Prevent default scrolling on touch
        // e.preventDefault() is often passive in React, so we use touch-action: none in CSS.

        const rect = gridRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const cellWidth = rect.width / cols;
        const cellHeight = rect.height / rows;

        let col = Math.floor(x / cellWidth);
        let row = Math.floor(y / cellHeight);

        // Clamp values to the grid bounds
        col = Math.max(0, Math.min(cols - 1, col));
        row = Math.max(0, Math.min(rows - 1, row));

        onSelectionChange({ width: col + 1, height: row + 1 });
    };

    const handlePointerDown = (e: ReactPointerEvent) => {
        (e.target as Element).setPointerCapture(e.pointerId);
        handlePointerUpdate(e);
    };

    const handlePointerMove = (e: ReactPointerEvent) => {
        handlePointerUpdate(e);
    };

    return (
        <div
            className="grid-container"
            ref={gridRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
        >
            {Array.from({ length: rows }).map((_, r) => (
                <div key={`row-${r}`} className="grid-row">
                    {Array.from({ length: cols }).map((_, c) => {
                        const isSelected = c < selection.width && r < selection.height;
                        const isEdgeX = c === selection.width - 1 && r < selection.height;
                        const isEdgeY = r === selection.height - 1 && c < selection.width;
                        const isCorner = isEdgeX && isEdgeY;

                        return (
                            <div
                                key={`cell-${r}-${c}`}
                                className={`grid-cell ${isSelected ? 'selected' : ''}`}
                            >
                                {isSelected && (
                                    <motion.div
                                        layoutId={`highlight-${r}-${c}`}
                                        className="cell-highlight"
                                        initial={false}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
                                    />
                                )}

                                {/* Optional: Add a subtle inner border or dot to show the corner */}
                                {isCorner && (
                                    <motion.div
                                        layoutId="corner-indicator"
                                        className="corner-indicator"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", bounce: 0.5 }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
